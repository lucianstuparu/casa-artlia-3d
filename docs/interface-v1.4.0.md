# Variant 1 v1.4.0 — explorer interface

1 November 2026. Implements the user-approved design study 01 in the furnished variant only. The base reconstruction v12.8.0, model geometry, furniture, materials, people and dimensions are unchanged.

The scene sits between a reserved light header and bottom dock. The four modes are Dollhouse, Plan, Walk and Photos. Room shortcuts and a collapsible map orient visitors; the map highlights a selected space, not a tracked visitor position. It uses the canonical plan polygons and switches to RDC for the café. Context cards hide during walking and whole-building camera views.

Study settings contains four sections: furnishing comparisons, the complete building inspector, inclined GTLE controls and walking preferences. Original controls are relocated with their existing handlers, rather than duplicated simulation logic. Both source-plan dialogs, photographs, assumptions, room areas, exports, original entrance-door controls, display layers and advanced cameras remain available. Before works has no platform and disables its controls; the furnished concept remains after works only.

Walking uses drag look by default, optional captured mouse, arrows/WASD/ZQSD and E for doors. Touch controls remain inside the viewport. Escape pauses; the dock resumes. Opening settings pauses walking. Language changes preserve the current visit. Romanian, French and English cover the new shell as well as the original controls.

The variant builder injects src/variant-1-interface.html, .css and .js after the model initializes. It does not alter canonical src/building* or dist/index.html. Tests for geometry and furnishings now target the relocated controls; interface.test.cjs verifies real UI interactions, responsive bounds, sources, GTLE movement and touch walking.

Verified in desktop Chrome: variant, downstairs, upstairs, visuals and interface tests; canonical base hash unchanged. The interface check covers 15 language/viewport combinations, plus a touch context. These browser checks do not substitute for a physical-device audit. Existing layout.test.cjs and i18n.test.cjs remain base-interface checks; interface.test.cjs is the new variant UI coverage.
