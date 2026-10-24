# Model history

The repository starts with the complete current v12.3.3 state. Earlier HTML files are preserved under `archive/releases/` as historical reference, not reconstructed Git history.

- v10.0: recovered original entrance façade, telescopic sliding door, surveyed staircase and separated inclined lift model. Kept as `src/base-v10.html`.
- v12.0: full ERP avant/après room reconstruction and phase switch.
- v12.1: full-height walls, bookshop and upper building context, rounded windows.
- v12.2: Drive-photo-guided exterior, concrete exterior stairs and landing, roof/attic corrections, solid stair divider and embedded photo viewer.
- v12.3.0: first-person walking with stairs, door interaction and collisions.
- v12.3.1: reliable mouse dragging and optional FPS capture, including silent-failure fallback.
- v12.3.2: C01 removed the misplaced partition across the upper stair exit.
- v12.3.3: C02 restored the full-height measured stair enclosure and wall-mounted GTLE contact; removed the false rear strip and adjusted the adjoining boundary.

Initial private repository packaging: 24 October 2026. Portable build/data split; no intended model behavior or geometry change during packaging.

- v12.4.0: reviewed UI against my.design; neutral light default and optional dark/automatic; reserved header/stage/action regions, view selector, grouped inspector tabs, walking controls below the scene, responsive touch controls. Geometry retained from v12.3.3. Added viewport/picking checks and a committed-dist GitHub Pages publishing command.

GitHub Pages enabled at https://lucianstuparu.github.io/casa-artlia-3d/ on 24 October 2026, publishing gh-pages root with HTTPS. Repository made public after GitHub rejected Pages on the private repository with the current plan; the user explicitly authorized this.

- v12.5.0: French / Romanian / English selector with saved preference and shareable language links. Translated controls, room names, 55 canvas annotations, walking/status text, source notes, assumptions, accessibility labels and live lift diagnostics. Original source images and geometry remain unchanged. Added language coverage, persistence, offline/storage-failure and viewport checks. Avoid refreshing hidden lift readouts on every animation frame; controller indicators still update.

- v12.6.0: July ERP8a/8b/10a after-works PMR toilet revision. Merge two sanitary rooms, remove partition/old doors, add stepped wall and 90cm sliding leaf with83cm clear opening, dimensioned fixtures and optional access zones. Update source viewers, room areas, FR/RO/EN and walking start. Before-works geometry retained. Source-vs-trace joins explicitly recorded as A15/C03.

- v12.7.0: C04 restores the photo-supported 50 cm recess to the left at the upper stair landing in both phases, with a floor, return guard and adjacent partition registration. Depth/position remain A16 assumptions. Original stairs, GTLE contacts and C03 PMR geometry preserved. Selling sign omitted.

- v12.7.1: C05 aligns rendered street walls with the entrance, removes the projecting entrance surround in favour of grey paint, and covers false slab ledges. Original apertures, door motion, ERP traces, stairs, GTLE and C01–C04 preserved. Render/backing depths are A17.

- v12.7.2: C06 moves the main access to the big room from the diagonal to the straight corridor partition in both phases. The diagonal is closed. Existing nominal door width/height retained; precise offset and swing are A18 assumptions. Other room geometry and corrections preserved.

- v12.7.3: C07 restores the missing lower Espace de jeu partition and local return in both phases. Refines the overly broad C01 deletion while preserving the surveyed stair landing and C06 main access. Local registration is A19.
