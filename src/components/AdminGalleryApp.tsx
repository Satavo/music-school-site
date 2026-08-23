"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { upload } from "@vercel/blob/client";
import type { BlobStoreAccess } from "@/lib/blob-config";
import type { GalleryItem } from "@/lib/gallery-types";
import {
  extensionFromContentType,
  GALLERY_ALLOWED_CONTENT_TYPES,
  GALLERY_MAX_IMAGE_BYTES,
  GALLERY_MAX_VIDEO_BYTES,
  galleryTypeFromContentType,
} from "@/lib/gallery-upload";
import { createGalleryItemId } from "@/lib/gallery-types";

type AdminGalleryAppProps = {
  initialAuthed: boolean;
};

type StatusMessage = {
  tone: "success" | "error" | "info";
  text: string;
};

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export function AdminGalleryApp({ initialAuthed }: AdminGalleryAppProps) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [configured, setConfigured] = useState(true);
  const [blobAccess, setBlobAccess] = useState<BlobStoreAccess>("private");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [usingBlob, setUsingBlob] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const selectedType = useMemo(
    () => (selectedFile ? galleryTypeFromContentType(selectedFile.type) : null),
    [selectedFile],
  );

  const selectedLimit = selectedType === "video" ? GALLERY_MAX_VIDEO_BYTES : GALLERY_MAX_IMAGE_BYTES;

  const loadGallery = useCallback(async () => {
    const response = await fetch("/api/admin/gallery", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load gallery.");
    const data = (await response.json()) as { items: GalleryItem[]; usingBlob: boolean };
    setItems(data.items);
    setUsingBlob(data.usingBlob);
  }, []);

  const ensureMigrated = useCallback(async () => {
    const response = await fetch("/api/admin/migrate", { method: "POST" });
    const data = (await response.json()) as {
      ok?: boolean;
      error?: string;
      migrated?: boolean;
      items?: GalleryItem[];
    };
    if (!response.ok) {
      throw new Error(data.error ?? "Could not prepare cloud gallery.");
    }
    if (data.items) {
      setItems(data.items);
      setUsingBlob(true);
    }
    return Boolean(data.migrated);
  }, []);

  useEffect(() => {
    if (!authed) return;

    void (async () => {
      try {
        setBusy(true);
        await loadGallery();

        const response = await fetch("/api/admin/gallery", { cache: "no-store" });
        const data = (await response.json()) as { usingBlob?: boolean };
        if (!data.usingBlob) {
          await ensureMigrated();
          await loadGallery();
        }
      } catch (error) {
        setStatus({
          tone: "error",
          text: error instanceof Error ? error.message : "Could not load admin gallery.",
        });
      } finally {
        setBusy(false);
      }
    })();
  }, [authed, ensureMigrated, loadGallery]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setStatus(null);
    setBusy(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Login failed.");
      }
      setAuthed(true);
      setPassword("");
      setStatus({ tone: "success", text: "Signed in." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Login failed.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setItems([]);
    setSelectedFile(null);
    setCaption("");
    setStatus({ tone: "info", text: "Signed out." });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setStatus(null);
    setSelectedFile(file);

    if (!file) return;

    const type = galleryTypeFromContentType(file.type);
    if (!type) {
      setStatus({ tone: "error", text: "Use JPG, PNG, WebP, or MP4." });
      setSelectedFile(null);
      return;
    }

    const limit = type === "video" ? GALLERY_MAX_VIDEO_BYTES : GALLERY_MAX_IMAGE_BYTES;
    if (file.size > limit) {
      setStatus({
        tone: "error",
        text: `File is too large. Max ${formatBytes(limit)}.`,
      });
      setSelectedFile(null);
    }
  }

  async function handlePublish(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedFile) {
      setStatus({ tone: "error", text: "Choose a photo or video first." });
      return;
    }
    if (!caption.trim()) {
      setStatus({ tone: "error", text: "Add a caption." });
      return;
    }

    setBusy(true);
    setUploadProgress(0);
    setStatus({ tone: "info", text: "Uploading…" });

    try {
      if (!usingBlob) {
        await ensureMigrated();
      }

      const extension = extensionFromContentType(selectedFile.type);
      const pathname = `gallery/media/${createGalleryItemId(caption)}${extension}`;

      const blob = await upload(pathname, selectedFile, {
        access: blobAccess,
        handleUploadUrl: "/api/admin/upload",
        contentType: selectedFile.type,
        multipart: selectedFile.size > 8 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setUploadProgress(percentage),
      });

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: blob.pathname,
          caption: caption.trim(),
          contentType: selectedFile.type,
        }),
      });
      const data = (await response.json()) as { error?: string; item?: GalleryItem };
      if (!response.ok) {
        throw new Error(data.error ?? "Could not publish item.");
      }

      await loadGallery();
      setSelectedFile(null);
      setCaption("");
      setUploadProgress(null);
      setStatus({ tone: "success", text: "Published to the gallery." });
    } catch (error) {
      setUploadProgress(null);
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Upload failed.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this item from the gallery?")) return;

    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Could not delete item.");
      }
      await loadGallery();
      setStatus({ tone: "success", text: "Removed from gallery." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Delete failed.",
      });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data: { configured?: boolean; blobAccess?: BlobStoreAccess }) => {
        setConfigured(Boolean(data.configured));
        if (data.blobAccess === "public" || data.blobAccess === "private") {
          setBlobAccess(data.blobAccess);
        }
      })
      .catch(() => setConfigured(false));
  }, []);

  if (!configured) {
    return (
      <main className="admin-shell">
        <div className="admin-card">
          <h1 className="admin-title">Gallery admin</h1>
          <p className="admin-lead">
            Admin is not configured yet. Set <code>ADMIN_PASSWORD</code>,{" "}
            <code>ADMIN_SESSION_SECRET</code>, and <code>BLOB_READ_WRITE_TOKEN</code> in Vercel.
          </p>
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="admin-shell">
        <div className="admin-card admin-card-narrow">
          <h1 className="admin-title">Gallery admin</h1>
          <p className="admin-lead">Sign in to add photos and videos.</p>
          <form className="admin-form" onSubmit={handleLogin}>
            <label className="admin-label">
              Password
              <input
                type="password"
                autoComplete="current-password"
                className="admin-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button type="submit" className="admin-button" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
          {status ? <p className={`admin-status admin-status-${status.tone}`}>{status.text}</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="admin-card">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Gallery admin</h1>
            <p className="admin-lead">Upload a photo or video, add a caption, and publish.</p>
          </div>
          <button type="button" className="admin-button admin-button-ghost" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        <form className="admin-form admin-upload-form" onSubmit={handlePublish}>
          <label className="admin-label">
            Photo or video
            <input
              type="file"
              accept={GALLERY_ALLOWED_CONTENT_TYPES.join(",")}
              className="admin-input"
              onChange={handleFileChange}
            />
          </label>
          <p className="admin-hint">
            JPG, PNG, WebP up to {formatBytes(GALLERY_MAX_IMAGE_BYTES)}. MP4 up to{" "}
            {formatBytes(GALLERY_MAX_VIDEO_BYTES)}.
            {selectedFile && selectedType
              ? ` Selected: ${selectedFile.name} (${formatBytes(selectedFile.size)}).`
              : ""}
            {selectedFile && selectedFile.size > selectedLimit
              ? " File exceeds limit."
              : ""}
          </p>

          <label className="admin-label">
            Caption
            <input
              type="text"
              className="admin-input"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Studio recital"
              maxLength={120}
              required
            />
          </label>

          {uploadProgress !== null ? (
            <div className="admin-progress" aria-live="polite">
              <div className="admin-progress-bar" style={{ width: `${uploadProgress}%` }} />
              <span>{Math.round(uploadProgress)}%</span>
            </div>
          ) : null}

          <button type="submit" className="admin-button" disabled={busy || !selectedFile}>
            {busy ? "Working…" : "Publish to gallery"}
          </button>
        </form>

        {status ? <p className={`admin-status admin-status-${status.tone}`}>{status.text}</p> : null}

        <section className="admin-list">
          <h2 className="admin-subtitle">Current gallery ({items.length})</h2>
          {items.length === 0 ? (
            <p className="admin-hint">No items yet.</p>
          ) : (
            <ul className="admin-items">
              {items.map((item) => (
                <li key={item.id} className="admin-item">
                  <div className="admin-item-preview">
                    {item.type === "video" ? (
                      <video src={item.src} muted playsInline preload="metadata" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.src} alt={item.alt} />
                    )}
                  </div>
                  <div className="admin-item-copy">
                    <p className="admin-item-caption">{item.caption}</p>
                    <p className="admin-item-meta">{item.type === "video" ? "Video" : "Photo"}</p>
                  </div>
                  <button
                    type="button"
                    className="admin-button admin-button-danger"
                    onClick={() => void handleDelete(item.id)}
                    disabled={busy}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
