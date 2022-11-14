import { styled } from "stitches.config";

export const HomeWrapper = styled("div", {
  flexing: "column",

  "@bp2": {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    height: "100%",
  },
});

export const ForecastWrapper = styled("div", {
  textAlign: "left",
  padding: "$16",
  overflow: "auto",
  "@bp2": {
    display: "grid",
    placeItems: "center",
    padding: "$12 0",

    h1: {
      width: "80%",
    },
  },
});

export const ImageFigure = styled("figure", {
  position: "relative",
  size: "300px",
  "@bp1": {
    size: "400px",
  },
});

export const TodaysForeCast = styled("div", {
  flexing: "column",
  padding: "$12",
  gap: "$16",
  backgroundColor: "$primary",
  marginBottom: "$32",

  "@bp2": {
    maxWidth: "400px",
    minHeight: "100vh",
    margin: 0,
  },
});

export const TodaysForeCastDetail = styled("section", {
  flexing: "column-center",
  gap: "$16",
  height: "100%",
  h1: {
    fontSize: "4rem",
    margin: 0,
    "&::after": {
      content: "\\2103",
      mx: "$4",
      fontSize: "1.25rem",
      opacity: 0.5,
      fontFamily: "inter",
    },
    "@bp2": {
      fontSize: "5rem",
    },
  },
  h2: {
    textTransform: "capitalize",
    fontWeight: "500",
    "@bp2": {
      fontSize: "2rem",
    },
  },
  "@bp2": {
    "span, svg": {
      fontSize: "1rem",
    },
  },
});

export const NextForecastWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "$8",
  padding: "$4",
  "@bp2": {
    width: "80%",
  },
});

export const DrawerSeacrhSection = styled("div", {
  flexing: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$8",
  svg: {
    cursor: "pointer",
  },
});
