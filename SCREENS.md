# Interface verification — v12.4.0

24 October 2026. Reviewed against [design brief](docs/design-review.md) and the applicable my.design exploration/dashboard rules.

| Screen / state | Status | Evidence |
| --- | --- | --- |
| Building overview, light | Checked | [Desktop](docs/images/ui-desktop.png), [phone](docs/images/ui-mobile.png) |
| Rooms / display / sources inspector | Checked | Scrolls within the stage; tab keyboard navigation; Escape and focus return |
| Source plan dialog | Checked | Embedded preview, level selector, close/Escape without closing inspector |
| Platform controls | Checked | One inspector at a time; original door, position and folding checks pass |
| Walking active / paused / settings | Checked | [Phone](docs/images/ui-walking.png); instructions below scene; drag/capture fallback and touch look |
| Dark / automatic theme | Checked | [Dark desktop](docs/images/ui-dark.png); light default, preference retained |
| Enlarged interface text | Checked in Chromium | 20 px controls/labels; inspector scrolls without page overflow |

Automated layout measurements: 48 states at 320×480, 360×640, 375×812, 390×844, 844×390, 768×1024, 1280×720 and 1440×900. Stage canvas bounds stay between header and action region; the primary action remains visible; plan picking accounts for those bounds. Both avant/après interior and exterior stair routes, wall mounting and original equipment behavior also pass.

Visual review removed the central walking card, dark floating status box, six-button view strip and permanently visible equipment toolbar. Existing 3D labels and materials remain unchanged. No unrelated list/input features were added.

Screenshots use desktop Chrome with emulated touch viewports. Physical phone / Safari testing and an independent human design review remain for a later iteration.

Live deployment verified: https://lucianstuparu.github.io/casa-artlia-3d/ — v12.4.0. GitHub reports the gh-pages build successful; HTTP version metadata and the complete live HTML match the reviewed local build. Live Chromium checks cover both phases, interior/overview, embedded plan/photo dialogs, mouse look/pause/exit and a 390 px touch viewport, with no JavaScript errors.

## v12.5.0 languages

FR / RO / EN checked in overview, inspector and active walking at 320×480, 375×812, 844×390 and 1440×900 (36 language/viewport states). Dynamic room details, plans, live diagnostics for both lift models, 55 canvas annotations, saved preference, link override and preserving walking/data state are covered. Original source images remain original. Offline standalone viewing and unavailable browser storage are checked. Phone screenshots are Chromium emulation; physical phone/Safari testing remains unverified.

Latest language screenshots: [Romanian phone](docs/images/ui-ro-walk.png), [English desktop](docs/images/ui-en-walk.png). All model, navigation, layout and language checks passed on the final local v12.5.0 build.

Live v12.5.0 verified on GitHub Pages: published HTML matches the reviewed build, all three languages switch correctly, translated room/source labels and the embedded plan viewer work, walking remains engaged through language changes, and the choice survives reload. No JavaScript errors in the live browser check.

## v12.6.0 revised PMR toilet

[After works](docs/images/pmr-after.png) and [before works](docs/images/pmr-before.png) inspected in running Chrome. The selected PMR room opens in cutaway; floor accessibility zones are optional. Dedicated checks cover the dimensioned room/circle, physical83cm opening, sliding leaf/no swing, collision and walking both ways, source viewers and FR/RO/EN. See docs/erp-pmr-update.md for the A15 global-registration limitation.

Final local v12.6.0: model checks, both-phase stair/lift/door navigation, 48 responsive layout states, 36 language viewport states and the PMR-specific geometry/door/source tests passed. An independent comparison against the model before applying C03 confirms the before-works room polygons, labels/areas, walls and openings are unchanged.

Live v12.6.0 checked on GitHub Pages: HTML matches the reviewed build, PMR cutaway and sliding animation work, the detail viewer opens ERP8b, before works retains the separate WC, after works removes it, and the first-person toilet start is on R+1. No JavaScript errors.

## v12.7.0 upper landing recess

C04 uses the 50 cm annotation on photo20260710_140700. The provisional recess depth/registration are explicit in A16. Verified first-person entry/return and actual mesh floor height, guard/partition containment, cutaway and first-person views in both phases. Existing17-step interior and exterior stair routes,17 GTLE wall contacts, door/lift animations,48 responsive states,36 language states, source-photo/assumption translations and C03 PMR checks passed. Independent comparison confirms all other room/wall records and PMR data are unchanged. No JavaScript errors. [Walk view](docs/images/landing-recess-walk.png), [cutaway](docs/images/landing-recess-cutaway.png).

Live v12.7.0 verified after Pages deployment3e993350dd693a363b1d73eee284be4916f8fddc: served HTML matches the reviewed build; both-phase recess entry/return, guard/partition containment, mesh floor height and FR/RO/EN source/assumption presentation pass in Chrome. No JavaScript errors.

## v12.7.1 continuous street façade

Reviewed [close oblique junction](docs/images/facade-junction.png) and [street elevation](docs/images/facade-street.png) in both phases against the exterior photo. C05 removes the false setback/projecting entrance frame and exposed slab ledges; A17 records render/backing assumptions.25 masonry ray samples per phase confirm the common street plane and thin paint. All required model, browser, layout, language, PMR and recess scripts passed individually. The npm wrapper hit Windows EBADF while spawning the build; the same build and every test script were run successfully with the available Node runtime. Independent data comparison confirms canonical room/wall/footprint, stair, PMR and C04 data unchanged. No JavaScript errors.

Live v12.7.1 verified after Pages deployment b2d9dda0424d6fe50ba0c70140684cc71cf673e3: served HTML matches the reviewed build,25 street-face samples per phase and the painted-surround thickness pass in Chrome, no JavaScript errors.

## v12.7.2 main access correction

Reviewed [after plan](docs/images/main-door-apres-plan.png) and [before plan](docs/images/main-door-avant-plan.png). The diagonal is solid and the main door is on the straight wall. Actual door orientation, closed collision and bidirectional passage when open pass in both phases. Existing stair/GTLE/entrance,48 layout states,36 language states, PMR, recess and façade checks pass. Independent comparison confirms all room polygons, other walls, PMR and prior correction data unchanged. No JavaScript errors.
