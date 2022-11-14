import React from "react";
import Image from "next/image";
import { List } from "domain/forecast/entities/forecast";
import { mutateTomorrowDate } from "domain/forecast/services/forecast.service";

import { styled } from "stitches.config";
import { Row } from "styles/Shared.styles";

export type ForeCastCardProps = {
  list?: List;
  titleFormat?: string;
  title?: string;
  higlight?: boolean;
};

const Wrapper = styled("div", {
  position: "relative",
  background: "$primary",
  borderRadius: "8px",
  padding: "$16",
  transition: "all ease 500ms",
  h4: {
    margin: "0",
  },
  span: {
    "&::after": {
      content: "\\2103",
      mx: "$4",
      fontSize: ".75rem",
      fontFamily: "inter",
    },
  },
  variants: {
    higlight: {
      true: {
        border: "thin solid Aqua",
      },
    },
  },
});

const ImageFigure = styled("div", {
  img: {
    display: "block",
    margin: "0 auto",
  },
});

const ForeCastCard = ({
  list,
  titleFormat,
  title,
  higlight,
}: ForeCastCardProps) => {
  return (
    <Wrapper higlight={higlight}>
      <h4>{title ?? mutateTomorrowDate(list?.dt_txt, titleFormat)}</h4>
      <ImageFigure>
        <Image
          width={118}
          height={100}
          src={`${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}${list?.weather[0].icon}@2x.png`}
          alt={list?.weather[0]?.main ?? "Weather Icon"}
        />
      </ImageFigure>
      <Row
        css={{
          justifyContent: "space-between",
          "span:last-child": { opacity: 0.5 },
        }}
      >
        <span>{list?.main.temp_min}</span>
        <span>{list?.main.temp_max}</span>
      </Row>
    </Wrapper>
  );
};

export default ForeCastCard;
