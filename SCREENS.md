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
