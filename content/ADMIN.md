# Gallery admin

Private page for the school owner to add photos and videos without redeploying the site.

## URL

`/admin`

## Setup (Vercel)

1. **Blob storage** — Project → Storage → Create Blob store. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
2. **Store access** — If the store is **Private** (Vercel default), set `BLOB_STORE_ACCESS=private` in env (this is the default). Gallery images are served through `/api/gallery/media`. For a **Public** store, set `BLOB_STORE_ACCESS=public`.
3. **Admin password** — Settings → Environment Variables:
   - `ADMIN_PASSWORD` — choose a long unique password (share only with the owner).
   - `ADMIN_SESSION_SECRET` — random string, e.g. `openssl rand -base64 32`.
4. Redeploy after adding variables.

## Local development

Add the same variables to `.env.local`, then `npm run dev` and open http://localhost:3000/admin.

For a **private** Blob store (default):

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
BLOB_STORE_ACCESS=private
ADMIN_PASSWORD=your-test-password
ADMIN_SESSION_SECRET=your-random-secret
```

## How to use

1. Open `/admin` and sign in with the password.
2. On first sign-in, existing gallery photos are copied to Blob automatically.
3. Choose a photo (JPG, PNG, WebP) or video (MP4).
4. Add a caption and click **Publish to gallery**.
5. The site updates within about a minute (or immediately after publish on production).

## Limits

- Photos: up to 10 MB (JPG, PNG, WebP)
- Videos: up to 100 MB (MP4)

## Fallback

If Blob is not configured, the public site keeps showing `content/gallery.json` and files in `public/images/gallery/`.

See also [GALLERY.md](./GALLERY.md) for the developer/manual workflow.
