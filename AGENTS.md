# Working on Casa Artlia

- Treat `src/` and `scripts/` as canonical. Generated `dist/index.html` and `dist/building-data.json` are committed for convenient offline viewing. Run `npm run build` after changes.
- Preserve the original v10 entrance façade, telescopic door, interior staircase, inclined Ganser GTLE animations and controls. Do not reintroduce the rejected vertical-elevator studies.
- Preserve avant/après switching, source viewers, orbit/plan views, first-person walking, drag look and the optional pointer-lock fallback.
- Keep one centimetre coordinate system. RDC=0 and R+1=312. Do not shift the surveyed staircase to compensate for ERP registration conflicts.
- Preserve C01 (clear upper stair exit) and C02 (walls at x0/z400 and full height580, with wall-mounted rail brackets). Source corrections are recorded in `src/model-data.cjs`.
- Distinguish printed ERP dimensions/areas, measured v10 geometry, user-confirmed corrections and assumptions. Keep unverified geometry explicitly marked in A01–A21 or correction records.
- Do not treat old HTML in `archive/releases/` as current verified geometry. The unavailable v11 HTML is not a geometric authority.
- Use `npm test` for code/geometry changes and inspect meaningful changed views in a running browser. Geometry changes require both phase checks; preserve stair navigation and wall-mount contact. Do not add tests that merely repeat constant assignments.
- The user authorized public GitHub Pages sharing on 24 October 2026, including a public repository if required. Publish only the reviewed generated dist tree to gh-pages. Preserve source/reference provenance; do not upload unrelated private material.
- Keep temporary downloads, credential material, local browser profiles and machine-specific runtime paths out of Git. Test outputs belong in ignored `test-results/`.

- All presentation labels support FR/RO/EN, including canvas text and legacy lift diagnostics. Add both translations in src/i18n-catalog.json when adding French text. Preserve original plan/photo pixels and canonical source geometry. Run the language checks; changing language must not reset the view, phase or walk.

- Preserve C03 in the after-works state: July PMR merger, 150/170 × 275 cm internal footprint, 20 cm offset over 215 cm, 90 cm sliding leaf / 83 cm clear frame. Before works remains the May trace. ERP 8b dimensions govern the toilet; local info/Dgt registration stays explicitly provisional in A15. Do not claim the global trace reproduces the source corridor clearance. Run tests/pmr.test.cjs for changes here.

- Preserve C04: the 50cm upper-landing recess, return guard and walkable floor in both phases. Width is annotated on photo20260710_140700; depth/position are A16 assumptions. It is distinct from the false rail-side strip removed by C02. Retain original stair/landing geometry and C03.

- Preserve C05: continuous street facade at original entrance plane z=-4; grey entrance arch is a thin painted finish. Context render registration covers false slab ledges. ERP room/wall traces stay canonical; backing depths are A17.

- All release outputs must also be stored in the user's Drive KB. Follow docs/drive-archive.md: upload release HTML/data/notes/previews and a source/reference archive, preserve history, verify uploads, and update the KB artifact register.

- Preserve C06: main_door is on main_corridor, the straight partition below the corner in plan. main_angle is closed at its former opening. Applies to both phases; offset and swing are A18.

- Preserve C07: restore play_boundary_lower and its landing-side return/link. C01 excludes the original misplaced full-span wall, not the real room separator. Keep the surveyed landing clear; navigation turns into Dgt below the restored partition. Local registration is A19.

- Preserve C08: landing-to-hall clearance is122cm between finished faces. The workshop partition is independent of the surveyed stair rear wall atz400, with a stepped return outside the core. Do not collapse those walls into one line again. Registration is A20; C03 retains the corrected hall tail.

- C09 supersedes the initial A08 equipment overlay: avant uses the ERP-style100cm inward hinged entrance and has no visible platform/rails/brackets or active lift controls. Apres preserves the original v10 telescopic door and inclined GTLE. Fixed glazing registration is A21.

- Variant1 is a separate furnishing study over v12.8.0: src/variant-1* and scripts/build-variant.cjs produce dist/variant-1* without editing the base HTML/data/version. Preserve that separation. V1-A01–A05 mark furnishing assumptions. Furniture appears after works only; retain base navigation, translations and controls. Run tests/variant-1.test.cjs and verify unchanged base hashes.

- Variant1 v1.2.0 changes upstairs with the user’s explicit authorization, superseding the v1.1.0 upstairs freeze. Preserve src/variant-1-downstairs.js, V.downstairs and actual RDC furniture/people; tests/upstairs.test.cjs compares these with the v1.1.0 release archive. v1.2.1: user explicitly requests half the playhouse depth. Depth means projection along X210→105cm, width270cm and height unchanged; move full-size stairs/slide105cm to match, retaining the far edge. V1-A08–A10 document 30 children per day, with a possible simultaneous peak of30 children +30 accompanying adults +3 illustrative staff, the A03 printed/traced area conflict and inset furnishing envelopes. Never present body fit or walk-through tests as comfort, accessibility or opening certification. Run all three variant test scripts, responsive and language checks.
