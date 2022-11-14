import { createStitches } from "@stitches/react";

const spacingSet = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 54, 64] as const;

export function calcSpaces(spaces: number) {
  return `${spaces / 16}rem`;
}

type SpacingKey = typeof spacingSet[number];

const spaces: Record<SpacingKey, string> = (() => {
  const spacing = new Map();
  spacingSet.forEach((space) => {
    spacing.set(space, calcSpaces(space));
  });
  return Object.fromEntries(spacing);
})();

export const { styled, css, createTheme, keyframes, globalCss, getCssText } =
  createStitches({
    utils: {
      mx: (value: string | number) => ({
        marginLeft: value,
        marginRight: value,
      }),
      flexing: (dir: "column" | "row" | "row-center" | "column-center") => {
        if (dir.includes("-center")) {
          return {
            display: "flex",
            flexDirection: dir.substring(0, dir.indexOf("-")),
            alignItems: "center",
            justifyContent: "center",
          };
        }
        return {
          display: "flex",
          flexDirection: dir,
        };
      },
      gridCenter: () => ({
        display: "grid",
        placeContent: "center",
      }),
      equallyGridColumn: (column: number) => ({
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(calc(100% / ${column}), 1fr))`,
      }),
      size: (value: number | string) => ({
        width: value,
        height: value,
      }),
    },
    media: {
      bp0: "(max-width:360px)",
      bp1: "(min-width: 768px)",
      bp2: "(min-width: 1200px)",
    },
    theme: {
      colors: {
        primary: "hsl(234,32%,17%)",
        neutral: "#ffffff",
      },
      space: spaces,
    },
  });
