# Variant 1 — Playhouse & coffee

Current version: **v1.1.0**, with a downstairs-only check-in/coffee study. Upstairs furnishings remain as in v1.0.1.

A separate furnishing concept built over the after-works state of base v12.8.0. The base HTML, building data, source geometry and base version are unchanged.

- Live concept: https://lucianstuparu.github.io/casa-artlia-3d/variant-1.html
- Original base: https://lucianstuparu.github.io/casa-artlia-3d/
- Drive concept archive: https://drive.google.com/drive/folders/1EJVyl-whP-kUA930vQGsq82UIAwOfEE7

## The proposal

At the far east end of Jeu principal, a raised wooden house echoes the user's reference: soft multicolour pitched roof, stairs on one side and a slide on the other. There is no bed. Floor cushions and a rug sit in the open play alcove underneath. The nominal body is210 ×270cm, with a115cm deck and approximately250cm overall height; roof overhangs are separate from its nominal footprint.

Parents have a sofa and shared coffee table in the same room, plus a window-side bench. A central low table leaves room for free play and routes between the main entrance and the house.

Espace de jeu becomes a little pretend-play village with a market and kitchen. The atelier has a shared creative table, low storage and materials. Bureau3 combines construction, a flexible table and reading. Rear service rooms receive modest storage and kitchen units.

The RDC now has a transverse dual counter: a lift-up registration section on the left and compact coffee equipment on the right, with one operator behind. Compare five and six waiting adults in the downstairs controls. Five fit tightly in two short files; the sixth intrudes into the entrance-turn study target. Clear the queue for GTLE boarding. See [the dimensioned downstairs study](downstairs-study.md).

## What informed it

The Drive business plan describes four themes: imitation play, construction, creative workshops and active play, with parents present. KB08 distinguishes that baseline from explored alternative business models. This variant keeps the family-play programme and uses the user's latest request to bring the coffee concept into this design study; it does not adopt an alternative business model or decide opening dates.

The old ERP working plan was consulted as historical programme context only. Its dimensions, obsolete business details and rejected lift alternatives do not replace the corrected base geometry. Two historical “business plan images” were inspected and proved to be demographic tables, not interior design references.

References and their intended use are recorded in src/variant-1-data.json. The user's playhouse image is retained in references/concepts. Origo's own architect describes the natural oak/dark metal/white ceramic palette: https://www.lama.ro/portofolio/origo-coffee-shop/

No private financial forecasts, personnel records or full business documents were copied into this public repository.

## Assumptions and practical limits

V1-A01–A07 distinguish the furnishing concept from surveyed geometry. Furniture dimensions, service connections, fittings and material choices are provisional. The raised house, guarding, stairs, slide and headroom need specialist development before fabrication. The upper play deck is visual only in the walking simulation, which stays on the existing building levels. People are illustrative scale figures, not an occupancy or staffing calculation.

Furniture and downstairs people block walking; upstairs figures retain their previous illustrative behaviour. Existing doors, stairs, GTLE and source viewers remain available. Furniture/people appear in after works only. FR, RO and EN remain available. Optional furniture/people switches are in the concept details panel, away from the scene.

## Iterate

Edit src/variant-1.js, src/variant-1-data.json, src/variant-1.css and src/variant-1-translations.json, then run:

    node scripts/build-variant.cjs
    node tests/variant-1.test.cjs

The builder reads dist/index.html without writing it, embeds its SHA-256 into variant metadata, and produces three separately named variant files. It also adds local walking starts only to the variant HTML. To adopt a future base, review the geometry and recorded base version first. Do not silently move this concept onto a changed reconstruction.

## Verification

Inspected main room, coffee counter, room overview, workshop, pretend-play and construction/reading views in running Chrome, plus eye-level exploration and phone layout. The dedicated test checks byte-identical base HTML, identical canonical geometry in the browser, actual playhouse/café bounds, furniture collision, two-way stairs in both phases, hide/show controls, phase visibility, FR/RO/EN, mouse look and five viewport sizes.

The variant also passed the existing48-state layout checks,36-state language checks and both-phase entrance checks. Physical-device touch and construction suitability remain unverified.

The previous v1.0.1 concept remains archived: https://drive.google.com/drive/folders/1_93wAlnxau-BQDxzD9aAwAiDWor3slhv
