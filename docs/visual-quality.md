# Variant 1 v1.3.0 — visual quality

The 26 October 2026 request authorizes visual refinements on both floors. The original base v12.8.0 HTML/data/version remain byte-identical. Room data, furniture layout, queue positions, occupancy choices and 105 cm playhouse depth are retained from v1.2.1.

- Procedural oak grain and staggered floor boards, physically mapped at 18 cm board width and 240 cm repeat length. Light terrazzo at RDC, woven upholstery and fine plaster bump.
- Rounded furniture edges, stitched cushions, basket pulls, ceramic cup rims/coffee surfaces and metal equipment finishes.
- Interior door veneers, panel reveals, hinges and two-sided metal levers; PMR sliding handles follow the carriage. Original openings, door leaf dimensions, picking and animation remain intact. Details share the cutaway clipping planes.
- Shaped shirts, tapered limbs, knees, hands, shoes, faces, hair and barista apron. Each standing figure is normalized to its existing independent stature/breadth/depth. Seated figures retain their seat height and a shorter seated silhouette; body proxies are rebuilt from actual bounds.
- Correct colour encoding, a warm-neutral fill and directional contact shadows. Geometry/texture caches and shadow invalidation avoid rebuilding static shadows every frame.

All materials and fittings are concept assumptions, V1-A12, not surveyed specifications. The people remain illustrative figures. The existing 30 children/day versus possible simultaneous peak distinction and printed/traced area discrepancy remain unchanged.

Edit src/variant-1-visuals.js for finishes and shared human anatomy. The builder embeds it only in dist/variant-1.html. No external image or runtime dependency was added.

Verification: dedicated variant, upstairs, downstairs and visual checks; physical UV scale, material/geometry inspection, door hardware motion and clipping, real body bounds, six two-way upstairs routes, crowded café entry and staff hatch, both-phase stair navigation, translations and responsive controls. Reviewed eight Chrome views, including eye-level people, close door/furniture, café, overview, workshop and phone. Synthetic body fit is not a real-world comfort or capacity certification.

Live: https://lucianstuparu.github.io/casa-artlia-3d/variant-1.html?lang=ro&v=1.3.0
Drive: https://drive.google.com/drive/folders/1a9Ya83nqMDx3T0UeLlTsDCfz0OfZ0bFY
