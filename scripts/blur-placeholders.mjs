import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
const dirs = ["photos", "about", "blog"];
const out = "new-redesign/config/blur.ts";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return files.flat();
}

const files = (await Promise.all(dirs.map((d) => walk(path.join(root, d))))).flat().filter((f) => /\.(jpe?g|webp)$/i.test(f)).sort();
const lines = [];
for (const file of files) {
  const buf = await sharp(file).resize(16, 16, { fit: "inside" }).jpeg({ quality: 50 }).toBuffer();
  lines.push(`  "/${path.relative(root, file).split(path.sep).join("/")}": "data:image/jpeg;base64,${buf.toString("base64")}",`);
}
await writeFile(out, `export const blurData: Record<string, string> = {\n${lines.join("\n")}\n};\n`);
console.log(`${files.length} placeholders → ${out}`);
