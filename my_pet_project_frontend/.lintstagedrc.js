export default {
  // Run Biome on staged files that have the following extensions: js, ts, jsx, tsx, json and jsonc
  "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
    "biome check --files-ignore-unknown=true", // Check formatting and lint
    "biome check --write --no-errors-on-unmatched", // Format, sort imports, lint, and apply safe fixes
    "biome check --write --unsafe --no-errors-on-unmatched", // Format, sort imports, lints, apply safe/unsafe fixes
    "biome format --write --no-errors-on-unmatched", // Format
    "biome lint --write --no-errors-on-unmatched", // Lint and apply safe fixes
  ],
  // Alternatively you can pass every files and ignore unknown extensions
  "*": [
    "biome check --no-errors-on-unmatched --files-ignore-unknown=true", // Check formatting and lint
  ],
};
