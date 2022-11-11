import React, { ComponentPropsWithoutRef } from "react";
import { styled } from "stitches.config";
import { CSS } from "@stitches/react";

interface TypoProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "hero" | "heading" | "regular" | "caption";
  weight?: "bold" | "semibold" | "regular";
  css?: CSS;
  children: React.ReactNode;
}

const StyledTypography = styled("span", {
  margin: "0 !important",
  color: "$N80",
  variants: {
    variant: {
      hero: {
        remFont: 36,
        lineHeight: "48px",
      },
      heading: {
        remFont: 24,
        lineHeight: "36px",
      },
      regular: {
        remFont: 16 / 1.25,
        lineHeight: "12px",
        "@bp1": {
          remFont: 16,
          lineHeight: "24px",
        },
      },
      caption: {
        remFont: 12,
        lineHeight: "16px",
      },
    },
    weight: {
      bold: {
        fontWeight: 800,
        letterSpacing: "-2%",
      },
      semibold: {
        fontWeight: 600,
        letterSpacing: "-1.5%",
      },
      regular: {
        fontWeight: 400,
        letterSpacing: "-0.5%",
      },
    },
  },
  defaultVariants: {
    variant: "regular",
    weight: "regular",
  },
});

const Typography = ({ children, ...rest }: TypoProps) => {
  return <StyledTypography {...rest}>{children}</StyledTypography>;
};

Typography.defaultProps = {
  variant: "regular",
  weight: "regular",
};
export default Typography;
