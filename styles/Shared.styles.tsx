import { styled } from "stitches.config";

export const Row = styled("div", {
  flexing: "row",
});

export const Column = styled("div", {
  flexing: "column",
});

export const Pointer = styled("div", {
  cursor: "pointer",
  "&:active": {
    opacity: 0.5,
  },
  variants: {
    true: {
      disabled: {
        cursor: "pointer",
      },
    },
  },
});
