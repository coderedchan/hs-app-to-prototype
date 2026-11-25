// Builds the prototype into one self-contained HTML file that opens with a
// double-click (no server needed): submission/4-demo/CareerPilot.html
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const outFile = join(root, "submission", "4-demo", "CareerPilot.html");

execSync("npx tsc --noEmit && npx vite build", { cwd: root, stdio: "inherit" });

const read = (urlPath) => readFileSync(join(dist, urlPath), "utf8");
let html = read("index.html");

// Inline the stylesheet, the script bundle and the favicon.
html = html.replace(/<link rel="stylesheet"[^>]*href="\/([^"]+)"[^>]*>/, (_, path) => `<style>${read(path)}</style>`);
html = html.replace(
  /<script type="module"[^>]*src="\/([^"]+)"[^>]*><\/script>/,
  (_, path) => `<script type="module">${read(path).replaceAll("</script", "<\\/script")}</script>`,
);
html = html.replace(
  /href="\/favicon\.svg"/,
  () => `href="data:image/svg+xml,${encodeURIComponent(read("favicon.svg"))}"`,
);

if (/(src|href)="\/(assets|favicon)/.test(html)) {
  throw new Error("Some assets were not inlined. Check the patterns in build-single-file.mjs.");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, html);
console.log(`\nWrote ${outFile} (${Math.round(html.length / 1024)} KB)`);
