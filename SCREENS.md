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

## v12.7.3 Espace de jeu partition

Reviewed both [after](docs/images/play-wall-apres-plan.png) and [before](docs/images/play-wall-avant-plan.png) plan views. The lower wall and return are present without entering the surveyed landing. Collision checks block passage through the wall; the existing play-room door still allows entry/return. Both-phase17-step stair routes and GTLE wall contacts pass. Other rooms, walls, PMR and prior correction data are unchanged. Existing responsive/language, façade, recess and C06 checks pass.

## v12.7.4 hall connection

Reviewed both-phase plans and cutaways ([after plan](docs/images/hall-apres-plan.png), [after cutaway](docs/images/hall-apres-cutaway.png)). Actual wall-face rays measure122cm, previously59.5cm. Upper and lower walking lanes pass; the workshop remains enclosed. Original stair/landing coordinates and GTLE mounts, PMR geometry, other doors/rooms and prior corrections are retained. Independent model comparison limits the change to the intended workshop/hall boundaries.

## v12.8.0 entrance phases

Reviewed both-phase closed and open entrance views in running Chrome ([before closed](docs/images/entrance-avant-closed.png), [before open](docs/images/entrance-avant-open.png), [after closed](docs/images/entrance-apres-closed.png), [after open](docs/images/entrance-apres-open.png)). Before works has the100cm inward hinged leaf and no GTLE meshes/controls. After works retains the original telescopic door and inclined GTLE. Door collision, bidirectional walking, phase visibility APIs/preferences and FR/RO/EN pass. A21 makes the fixed glazing registration explicit; see docs/entrance-phases.md.

Full local v12.8.0 verification: all11 scripts passed individually using the trusted Node runtime (model, browser, layout, i18n, PMR, recess, facade, main door, play wall, hall, entrance). This includes both stair routes, GTLE mount contacts,48 responsive states and36 language states. Independent comparison confirms room/wall geometry and original v10 source unchanged. No browser JavaScript errors.

## Separate Variant1 v1.0.1

The base v12.8.0 HTML, data and version are unchanged. Reviewed furnished [main room](docs/images/variant1-main.png), [coffee counter](docs/images/variant1-coffee.png), [overview](docs/images/variant1-overview.png), [phone](docs/images/variant1-375.png) and [eye-level house view](docs/images/variant1-walk-main.png). The user reference is interpreted as a raised house without a bed, with open floor play underneath. Other rooms follow the family-play programme from Drive; see docs/variant-1.md.

Variant checks cover exact base HTML hash and unchanged canonical data, actual furnishing bounds, collision, both-phase stair navigation, phase/layer visibility,3 languages, mouse look and5 sizes. The existing48-state layout,36-state language and both-phase entrance scripts also passed on the variant. Optional layers moved into the information panel after a320×480 equipment-state check exposed cramped viewing space; final layout passed. Full original model/browser/layout/language/PMR/recess/facade/main-door/play-wall/hall/entrance checks also passed again on the unchanged base, using the trusted Node runtime. Physical-device and construction validation remain unverified.

## Variant1 v1.1.0 — downstairs only

Reviewed [busy café](docs/images/coffee-busy-5.png), [five-person footprint plan](docs/images/coffee-plan-5.png), [six-person comparison](docs/images/coffee-plan-6.png), [cleared boarding study](docs/images/coffee-plan-0.png), phone and eye-level views in running Chrome. Actual adult meshes are162–188cm high with independent breadth/depth. Five waiting customers plus one operator fit tightly in the modelled two-file arrangement; the sixth intrudes into the90cm local entrance-turn target. This is a furnishing/space study, not an occupancy or accessibility certificate.

Dedicated checks measure actual body and proxy bounds, floor/headroom/counter non-overlap, crowded entry and return, physical customer collision, open/closed staff hatch, restoration of the alcove ceiling,3 languages and4 sizes. Actual upstairs furniture and people meshes compare equal with v1.0.1; their source block, canonical building data and base HTML are unchanged. Existing variant stair checks,48 layout states,36 language states and original entrance tests with queue cleared pass.
