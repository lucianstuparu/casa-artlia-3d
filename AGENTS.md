# Working on Casa Artlia

- Treat `src/` and `scripts/` as canonical. Generated `dist/index.html` and `dist/building-data.json` are committed for convenient offline viewing. Run `npm run build` after changes.
- Preserve the original v10 entrance façade, telescopic door, interior staircase, inclined Ganser GTLE animations and controls. Do not reintroduce the rejected vertical-elevator studies.
- Preserve avant/après switching, source viewers, orbit/plan views, first-person walking, drag look and the optional pointer-lock fallback.
- Keep one centimetre coordinate system. RDC=0 and R+1=312. Do not shift the surveyed staircase to compensate for ERP registration conflicts.
- Preserve C01 (clear upper stair exit) and C02 (walls at x0/z400 and full height580, with wall-mounted rail brackets). Source corrections are recorded in `src/model-data.cjs`.
- Distinguish printed ERP dimensions/areas, measured v10 geometry, user-confirmed corrections and assumptions. Keep unverified geometry explicitly marked in A01–A15 or correction records.
- Do not treat old HTML in `archive/releases/` as current verified geometry. The unavailable v11 HTML is not a geometric authority.
- Use `npm test` for code/geometry changes and inspect meaningful changed views in a running browser. Geometry changes require both phase checks; preserve stair navigation and wall-mount contact. Do not add tests that merely repeat constant assignments.
- The user authorized public GitHub Pages sharing on 24 October 2026, including a public repository if required. Publish only the reviewed generated dist tree to gh-pages. Preserve source/reference provenance; do not upload unrelated private material.
- Keep temporary downloads, credential material, local browser profiles and machine-specific runtime paths out of Git. Test outputs belong in ignored `test-results/`.

- All presentation labels support FR/RO/EN, including canvas text and legacy lift diagnostics. Add both translations in src/i18n-catalog.json when adding French text. Preserve original plan/photo pixels and canonical source geometry. Run the language checks; changing language must not reset the view, phase or walk.

- Preserve C03 in the after-works state: July PMR merger, 150/170 × 275 cm internal footprint, 20 cm offset over 215 cm, 90 cm sliding leaf / 83 cm clear frame. Before works remains the May trace. ERP 8b dimensions govern the toilet; local info/Dgt registration stays explicitly provisional in A15. Do not claim the global trace reproduces the source corridor clearance. Run tests/pmr.test.cjs for changes here.
