# Visual thesis: glacial minimal ceramics

`git-stage-lines` turns a rough, interactive Git operation into one exact,
quiet gesture. The site treats the index as a thin ceramic slab emerging from
blue glacial light: tactile enough to explain separate layers, spare enough to
feel like a dependable Unix primitive. It deliberately avoids terminal-green,
generic dark developer dashboards, gradients, and card grids.

## Palette

- **Snow field** `#f3f5f2`: cool mineral background, never pure white.
- **Porcelain** `#fbfcf8`: the raised documentation surface.
- **Ink** `#172421`: blue-black primary text (13.8:1 on snow).
- **Slate** `#52635f`: secondary text (5.7:1 on snow).
- **Glacial blue** `#296779`: action/accent (5.6:1 on porcelain).
- **Deep blue** `#174956`: hover/focus and high-contrast controls.
- **Moss** `#386b57`: additions and success, always paired with `+` or text.
- **Oxide** `#9b473c`: deletions/errors, always paired with `−` or text.
- **Hairline** `#c7d1cc`: separators and ceramic edges.
- **Night ice** `#101b1a`, **night porcelain** `#172524`, **night ink**
  `#edf3ef`, **night slate** `#b5c2bd`: explicit dark treatment selected by
  the user's OS preference.

## Type and spacing

The interface uses system UI sans (`Inter`-like metrics without a font
download) for explanation and the native monospace stack for commands, line
numbers, and the wordmark. This is a utility, so avoiding a font request is
both faster and more honest than decorative type. The scale is 14, 16, 20,
28, 44, and 68px; prose is limited to 68 characters. Spacing follows an 8px
rhythm with 4px optical adjustments. Wide sections use a 1184px measure;
phone layouts collapse the command sculpture before removing any content.

## Interaction grammar and motion

Controls behave like glazed ceramic switches: a crisp 1px edge, 3px blue
focus halo, and a 1px downward press. Copy buttons immediately change label
to “Copied” and announce the result. The line-selector demo is fully keyboard
operable with native form controls and renders locally; it never uploads code.
Entrances use a single 240ms opacity/translate reveal and hover changes use
160ms. Under `prefers-reduced-motion`, transforms and smooth scrolling are
removed and state changes are instant. Nothing loops or flashes.

## Original asset plan and provenance

The hero uses one original raster still: an editorial studio photograph of
three thin porcelain code slabs separated by a translucent glacial-blue seam,
with tiny abstract incised line marks and ample negative space. It explains
index/selection/working-tree layering rather than decorating the page. It is
generated specifically for this product with the factory image generator,
then converted locally to WebP at no more than 1600px and 300KB. Prompt and
generator details are recorded here after generation. No third-party stock,
icons, fonts, or scripts are used.

The small snowflake/line-range mark is hand-made in CSS from rules and text;
it is not a borrowed icon.
