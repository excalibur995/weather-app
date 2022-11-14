"use client";
import React, { ReactNode } from "react";
import DrawerComponent from "react-modern-drawer";
import { styled } from "stitches.config";

type DrawerProps = {
  open: boolean;
  direction: "right" | "left" | "top" | "bottom";
  children: ReactNode;
};

const StyledDrawerComponent = styled(DrawerComponent, {
  background: "$primary !important",
  width: "100% !important",
  padding: "$16",
  "@bp2": {
    maxWidth: "400px",
  },
});

const Drawer = (props: DrawerProps) => {
  return (
    <StyledDrawerComponent {...props}>
      {props.open && React.cloneElement(<>{props.children}</>, {})}
    </StyledDrawerComponent>
  );
};

Drawer.defaultProps = {
  open: false,
  direction: "left",
};
export default Drawer;
