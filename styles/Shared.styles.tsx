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

export const ListWrapper = styled("ul", {
  listStyleType: "none",
  padding: 0,
  margin: 0,
});
export const ListItem = styled("li", {
  flexing: "column",
  justifyContent: "center",
  margin: "$16",
  cursor: "pointer",
  minHeight: 40,
  transition: "all ease 500ms",
  "&:hover": {
    opacity: 0.5,
  },
});
