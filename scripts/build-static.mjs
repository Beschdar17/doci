import { existsSync, renameSync, rmSync, cpSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const moves = [
  {
    from: join(root, "src/app/api"),
    to: join(root, "src/app/_api_disabled"),
  },
  {
    from: join(root, "src/app/admin"),
    to: join(root, "src/app/_admin_disabled"),
  },
];

function moveOut() {
  for (const { from, to } of moves) {
    if (existsSync(from)) renameSync(from, to);
  }
}

function moveBack() {
  for (const { from, to } of moves) {
    if (existsSync(to)) renameSync(to, from);
  }
}

function cleanCache() {
  const next = join(root, ".next");
  if (existsSync(next)) rmSync(next, { recursive: true, force: true });
}

process.on("SIGINT", () => {
  moveBack();
  process.exit(1);
});

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://admin.doci-trockenbau.de";

cleanCache();
moveOut();

try {
  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "true",
      NEXT_PUBLIC_API_BASE: apiBase,
    },
    cwd: root,
  });

  const extras = join(root, "ionos-extras");
  const out = join(root, "out");
  if (existsSync(extras)) {
    cpSync(extras, out, { recursive: true });
    console.log("✓ ionos-extras → out/ kopiert");
  }

  console.log(`\n✓ Static build complete → out/  (API: ${apiBase})`);
} catch (err) {
  console.error("\n✗ Static build failed");
  process.exitCode = 1;
} finally {
  moveBack();
}
