import React from "react";
import { ImCompass } from "react-icons/im";
import { List } from "domain/forecast/entities/forecast";
import { styled } from "stitches.config";

type HighlightedCardProps = {
  list?: List;
};
const Wrapper = styled("div", {
  width: "inherit",
  gap: "$8",
  equallyGridColumn: 2.5,
  "@bp0": {
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  },
});

const WrapperCard = styled("div", {
  flexing: "column-center",
  position: "relative",
  background: "$primary",
  borderRadius: "8px",
  padding: "$16",
});

const Title = styled("h2", {
  fontSize: "2rem",
  margin: "1rem 0",
  "@bp2": { fontSize: "3rem" },
  "&::after": {
    fontSize: "1rem",
    margin: "$8",
  },
});

const CompasWrapper = styled("div", {
  transition: "transform ease 500ms",
});

const Compas = styled(ImCompass, {
  svg: {
    stroke: "AliceBlue",
  },
});

const HighlightedCard = ({ list }: HighlightedCardProps) => {
  return (
    <Wrapper>
      <WrapperCard>
        Wind Status
        <Title css={{ "&::after": { content: "mph" } }}>
          {list?.wind?.speed ?? 0}
        </Title>
        <CompasWrapper css={{ transform: `rotate(${list?.wind?.deg}deg)` }}>
          <Compas />
        </CompasWrapper>
      </WrapperCard>
      <WrapperCard>
        Humdity
        <Title css={{ "&::after": { content: "%" } }}>
          {list?.main.humidity ?? 0}
        </Title>
      </WrapperCard>
      <WrapperCard>
        Visibility
        <Title css={{ "&::after": { content: "miles" } }}>
          {(list?.visibility ?? 0) / 1000}
        </Title>
      </WrapperCard>
      <WrapperCard>
        Air Pressure
        <Title css={{ "&::after": { content: "mmb" } }}>
          {list?.main?.pressure ?? 0}
        </Title>
      </WrapperCard>
    </Wrapper>
  );
};

export default HighlightedCard;
