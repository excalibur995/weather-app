import { ReactNode } from "react";
import { styled } from "stitches.config";

type RootLayoutProps = { children: ReactNode };

const Wrapper = styled("div", {
  flexing: "column",
  justifyContent: "flex-start",
  minHeight: "100vh",
  overflow: "hidden auto",
  "@bp1": {
    // maxWidth: "90rem",
    margin: "0 auto",
    overflow: "auto",
  },
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default RootLayout;
