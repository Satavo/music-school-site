import galleryData from "../../content/gallery.json";
import { parseGalleryItems, type GalleryItem } from "@/lib/gallery-types";

export const STATIC_GALLERY_ITEMS: GalleryItem[] = parseGalleryItems(galleryData);
