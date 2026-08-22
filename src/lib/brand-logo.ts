import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function getBrandLogoDataUrl() {
  const logoData = await readFile(join(process.cwd(), "public/images/logo-light.png"));
  return `data:image/png;base64,${logoData.toString("base64")}`;
}
