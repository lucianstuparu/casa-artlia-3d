# Working on Casa Artlia

- Treat `src/` and `scripts/` as canonical. Generated `dist/index.html` and `dist/building-data.json` are committed for convenient offline viewing. Run `npm run build` after changes.
- Preserve the original v10 entrance façade, telescopic door, interior staircase, inclined Ganser GTLE animations and controls. Do not reintroduce the rejected vertical-elevator studies.
- Preserve avant/après switching, source viewers, orbit/plan views, first-person walking, drag look and the optional pointer-lock fallback.
- Keep one centimetre coordinate system. RDC=0 and R+1=312. Do not shift the surveyed staircase to compensate for ERP registration conflicts.
- Preserve C01 (clear upper stair exit) and C02 (walls at x0/z400 and full height580, with wall-mounted rail brackets). Source corrections are recorded in `src/model-data.cjs`.
- Distinguish printed ERP dimensions/areas, measured v10 geometry, user-confirmed corrections and assumptions. Keep unverified geometry explicitly marked in A01–A14 or correction records.
- Do not treat old HTML in `archive/releases/` as current verified geometry. The unavailable v11 HTML is not a geometric authority.
- Use `npm test` for code/geometry changes and inspect meaningful changed views in a running browser. Geometry changes require both phase checks; preserve stair navigation and wall-mount contact. Do not add tests that merely repeat constant assignments.
- Keep this repository private. Do not add public deployment, GitHub Pages or publish reference files without the user's request.
- Keep temporary downloads, credential material, local browser profiles and machine-specific runtime paths out of Git. Test outputs belong in ignored `test-results/`.
