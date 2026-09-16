import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("dist/manifest.webmanifest", "utf8"));
const serviceWorker = readFileSync("dist/sw.js", "utf8");

if (manifest.start_url !== "/khiron/#/morning") {
  throw new Error("The PWA start URL is not aligned with the GitHub Pages base path.");
}

if (!manifest.icons.some((icon) => icon.sizes === "192x192")) {
  throw new Error("The PWA manifest is missing its 192×192 icon.");
}

if (!manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose.includes("maskable"))) {
  throw new Error("The PWA manifest is missing a maskable 512×512 icon.");
}

if (!serviceWorker.includes("googleapis") || !serviceWorker.includes("NetworkOnly")) {
  throw new Error("Google Drive media must remain network-only in the service worker.");
}

console.log("PWA manifest and private-media caching policy verified.");
