# Gallery

How to add photos and videos to the site.

## Option A — Admin page (recommended for the owner)

Use **`/admin`** — see [ADMIN.md](./ADMIN.md) for setup and instructions.

## Option B — Manual (developer)

### 1. Add the file

- Photos: `public/images/gallery/` (jpg, png, webp)
- Videos: `public/videos/` (mp4)

### 2. Register it in `gallery.json`

Order in the `items` array is the order on the site.
After edits, redeploy or run `npm run build`.

**Note:** When Vercel Blob is configured, the live gallery reads from Blob instead of `gallery.json`.

### Photo

```json
{
  "id": "unique-slug",
  "type": "image",
  "src": "/images/gallery/my-photo.jpg",
  "alt": "Short description for accessibility",
  "caption": "Caption under the photo"
}
```

### Video

```json
{
  "id": "lesson-clip",
  "type": "video",
  "src": "/videos/lesson.mp4",
  "alt": "Short description of the video",
  "caption": "Caption",
  "poster": "/images/gallery/lesson-poster.jpg"
}
```

`poster` is optional (thumbnail before play).
