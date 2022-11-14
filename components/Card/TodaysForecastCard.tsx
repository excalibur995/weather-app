import dayjs from "dayjs";
import React from "react";
import Image from "next/image";

import { MdLocationOn } from "react-icons/md";
import { getRegionNames } from "shared/utils";
import { TodaysForeCastDetail, ImageFigure } from "styles/Home.styled";
import { Column, Row } from "styles/Shared.styles";
import { City, List } from "domain/forecast/entities/forecast";

type TodaysForecastCardProps = {
  todayForecast: List[];
  forecastCity: City;
};

const TodaysForecastCard = ({
  todayForecast,
  forecastCity,
}: TodaysForecastCardProps) => {
  const lastIndex = todayForecast.length - 1;

  return (
    <TodaysForeCastDetail>
      <ImageFigure>
        <Image
          fill
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          src={`${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}${todayForecast[lastIndex].weather[0].icon}@2x.png`}
          alt={todayForecast[lastIndex].weather[0].main}
        />
      </ImageFigure>
      <Column css={{ alignItems: "center", gap: "$8" }}>
        <h1>{todayForecast[lastIndex].main.temp}</h1>
        <h2>{todayForecast[lastIndex].weather[0].description}</h2>
        <Row css={{ gap: "$4" }}>
          <span>Today</span>
          <span>&#176;</span>
          <span>
            {dayjs(todayForecast[lastIndex].dt_txt).format("ddd DD MMM HH:mm")}
          </span>
        </Row>
        <Row css={{ alignItems: "center" }}>
          <MdLocationOn />
          <span>
            {forecastCity?.name}, {getRegionNames(forecastCity?.country ?? "")}
          </span>
        </Row>
      </Column>
    </TodaysForeCastDetail>
  );
};

export default TodaysForecastCard;
