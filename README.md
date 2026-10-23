# Casa Artlia 3D

Private working repository for the interactive Casa Artlia building model. Current baseline: **v12.4.0**.

It includes the ERP **avant / après** switch, RDC and R+1 reconstruction, the original entrance and telescopic door, interior staircase, Ganser GTLE animation, exterior stairs and landing, neighbouring building context, source-plan/photo viewers, and first-person walking.

## Open the model

Open `dist/index.html` directly in a browser. It is self-contained and runs offline.

For a local preview, install Node.js 20 or newer, then run:

```sh
npm ci
npm run build
npm run dev
```

Open <http://127.0.0.1:3000>. The preview server listens only on localhost.

## Edit and rebuild

| File | Purpose |
| --- | --- |
| `src/model-data.cjs` | Room and wall geometry, source dimensions, assumptions, coordinates and correction history |
| `src/building.js` | Three.js building geometry, interactions and first-person movement |
| `src/building-ui.html` | Controls and dialogs |
| `src/building.css` | App layout and styling |
| `src/base-v10.html` | Safe original v10 entrance, staircase and inclined lift implementation |
| `scripts/build.cjs` | Assemble the standalone HTML and exported model JSON |
| `references/` | Original ERP PDFs, plan previews, photos and provenance |
| `vendor/` | Offline Three.js r128 runtime and its license |
| `dist/` | Committed, ready-to-open generated model and JSON |
| `archive/releases/` | Earlier snapshots, retained for comparison only |

After a change, run `npm run build`, refresh the browser, and commit the source changes together with the generated `dist` files. `docs/model-notes.txt` documents the current measurements and known limits. The original packaging was checked to reproduce the existing delivered HTML byte for byte.

## Browser checks

```sh
npx playwright install chromium
npm test
```

On this Windows desktop, folder protection blocks writes by npm-spawned Node processes with `EBADF`. The same checks pass when invoked directly with the trusted Node runtime. If this affects your local setup, run these instead of `npm test`:

```sh
node scripts/build.cjs
node tests/model.test.cjs
node tests/browser.test.cjs
node tests/layout.test.cjs
```

The checks rebuild the app, validate geometry data, run it in Chromium, walk both states up and down the staircase, check the open landing, confirm wall mounting contact, exercise mouse look and capture fallback, and verify the original door/lift controls. The layout checks also start their own preview server and measure eight viewport sizes, light/dark, inspector, source dialog, walking states and plan picking. Screenshots and reports go into ignored `test-results/`.

To use an existing Chrome installation instead of downloading Chromium, set `BROWSER_PATH` to its executable before `npm test`.

## Walking controls

Choose **Visiter → Explorer**. Hold either mouse button and drag to turn. Use arrows, WASD or ZQSD to walk, Shift to move faster, and E or a brief click to operate a nearby door. Escape pauses. Under **Réglages**, the **Départ** selector offers several starting points. Optional unrestricted mouse look is under **Regard → Souris capturée · FPS**; blocked capture returns to dragging.

## Geometry conventions and corrections

All coordinates are in centimetres: x across the entrance toward the long wing, y up, and z away from Ruelle des Jardins. RDC is y=0; R+1 is y=312.

- **C01:** the incorrectly reconstructed partition across the upper stair exit was removed in both states.
- **C02:** the stairs meet the full-height walls at x=0 and z=400, with the GTLE brackets attached to those walls. The false rear floor strip was removed and the adjacent room boundary registered locally to the measured enclosure.

Printed ERP areas and dimensions are preserved separately from calculated traced areas. A01–A14 and the original outlines behind corrections remain in the data. Roof heights, unseen roof returns, private balcony and neighbouring interiors remain approximate. The v11 geometry was never treated as verified.

## Reference material

Original ERP PDFs and photographs are included for work inside this private repository. Their original Drive links are retained in `references/photos/sources.json` and the model data. The original source material and the user's later confirmations govern reconstruction decisions. The vendored Three.js runtime has its own MIT license; project/model/reference content has not been assigned an open-source license.

## Interface and publishing

The v12.4 interface follows the applicable preferences in [my.design](https://github.com/lucianstuparu/my.design). It defaults to light, with optional dark/automatic under Explorer → Affichage. Rooms, display and sources share one inspector. See [design review](docs/design-review.md) and [screen checks](SCREENS.md).

GitHub Pages publishes the root of the dedicated `gh-pages` branch. Only the generated `dist/` files are deployed; the working source, original references and archive remain on `main`. No custom build workflow or service worker is needed.

For each iteration: rebuild, test, commit sources and generated files on `main`, push `main`, then run:

```sh
npm run deploy
```

The publish script splits the committed `dist/` tree and pushes it to `gh-pages` without switching the working checkout. It requires a clean `main` branch and normal Git push authentication. On the affected Windows setup, invoke `node scripts/publish.cjs` directly. Verify the GitHub Pages deployment and the live `/version.json` after publishing. Refresh the browser to load an update; downloaded standalone HTML remains a fixed offline copy.
