# Interface review — v12.4.0

Preferences: [my.design](https://github.com/lucianstuparu/my.design), reviewed 24 October 2026: brief, actions, layout, words, visual system, profiles, exclusions, tokens, verification and sheet pattern.

## Brief

1. Let visitors compare layouts, inspect evidence and walk at eye level while keeping the building visible.
2. Shared browser link; primarily desktop, also usable on phone and tablet.
3. Neutral light default, one teal accent, frequent targets at least 40 px, one 56 px walking action, no central instruction card, one inspector at a time, reserved header/stage/action regions, no horizontal overflow at the documented viewport sizes.
4. Geometry, materials, evidence, animations and walking physics are outside this change.
5. Dashboard / exploration profile, with guided-task conventions for walking. Task undo and input-bar patterns do not apply.

## Review and plan

The former UI had six competing view buttons, a separate status card, two equipment overlays, a long settings panel and central walking instructions. Dark translucent boxes competed with the model; small labels and fixed bottom offsets made phones worse.

Use system type, neutral white surfaces, an 8 px spacing grid, 8/12/20 px radii, dark teal controls and visible focus. Light is the default in response to the request; automatic and dark are optional. Keep building materials unchanged.

Header: identity, avant/après, equipment and inspector.
Stage: unobstructed model, with one optional inspector.
Action region: view selector, Visiter, concise context/source link.
Walking replaces the action region: location, settings, resume/pause and exit. Instructions appear only while paused. Touch directions share this region.

Critique before implementation: omit hero headers, extra floating cards, glass effects and per-setting cards. A native selector replaces the six view buttons. Group settings with separators. Sources have their own tab. Adapt the preferences to a 3D workspace rather than copying a list app.

## State table

| State | Main action | Escape / return | Offline |
| --- | --- | --- | --- |
| Overview / interior / plan / entrance / exterior | Visiter | Close inspector first | Downloaded HTML works |
| Inspector | Existing view action | Close and restore focus | Embedded evidence works |
| Walking paused | Explorer / Reprendre | Quitter restores previous view | Works |
| Walking active | Pause in the same slot | Pause, release mouse | Works |
| Capture blocked | Continue using drag | Pause | Drag works |
| Source dialog | Close | Close, restore focus | Previews work; Drive needs network |
| Reload | Overview | — | Downloaded HTML starts normally |

## Verification

See SCREENS.md and ignored test-results for browser measurements and screenshots. Preserve existing checks of both phases, stairs, wall mounts, doors, lift and mouse/touch look. Check the inspector, equipment, walking, dialogs, light/dark, small screens, landscape and enlarged text. Real-device touch feel remains to be checked on the user's phone.
