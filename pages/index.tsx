import useGeoLocation from "shared/hooks/useGeolocation";
import TodaysForecastCard from "components/Card/TodaysForecastCard";
import ForeCastCard from "components/Card/ForeCastCard";
import HighlightedCard from "components/Card/HighlightedCard";
import dayjs from "dayjs";
import { useForecastHooks } from "domain/forecast/hooks/useForecastHook";
import { useBookParamState } from "domain/forecast/states/forecast.states";
import {
  ForecastWrapper,
  HomeWrapper,
  NextForecastWrapper,
  TodaysForeCast,
} from "styles/Home.styled";
import { BiCurrentLocation } from "react-icons/bi";
import { Column, Pointer, Row } from "styles/Shared.styles";
import { CSS } from "@stitches/react";

import { useMemo } from "react";

const cssSection = {
  "@bp2": { width: "80%" },
  padding: "$4",
};
const customRowCSS = {
  flexing: "row-center",
  width: "inherit",
  justifyContent: "space-between",
} as CSS;

export default function Home() {
  const { data, isFetching, refetch } = useGeoLocation();
  const states = useBookParamState((state) => state);
  useForecastHooks({
    params: { ...data?.coordinates!, units: states.units } || {
      lat: 0,
      lon: 0,
      units: states.units,
    },
    enabled: !isFetching && !data?.isNotAllowingGeolocation,
    onSuccess: states.setForecast,
  });

  const onSetForecastToToday = () => {
    if (states.forecast) {
      const todayList = states.forecast.list[dayjs().format("DD_MM_YYYY")];
      states.setHourlyForecast(todayList);
    }
  };

  const higlightedDate = useMemo(
    () => dayjs(states.selectedForecast?.dt_txt).format("ddd, DD MMM HH:mm a"),
    [states.selectedForecast?.dt_txt]
  );

  const isHiglightedDateToday = useMemo(
    () => dayjs(states.selectedForecast?.dt_txt).get("D") === dayjs().get("D"),
    [states.selectedForecast?.dt_txt]
  );

  return (
    <HomeWrapper>
      <TodaysForeCast>
        <Row css={{ justifyContent: "space-between", alignItems: "center" }}>
          <button>Search for Places</button>
          <Pointer>
            <BiCurrentLocation onClick={() => refetch()} />
          </Pointer>
        </Row>
        {states.todayForecast && states.forecastCity && (
          <TodaysForecastCard
            forecastCity={states.forecastCity}
            todayForecast={states.todayForecast}
          />
        )}
      </TodaysForeCast>
      <ForecastWrapper>
        <Column css={cssSection}>
          <h2>Next 5 days</h2>
          <NextForecastWrapper>
            {Object.keys(states?.forecastList ?? {}).map((item, idx) => (
              <Pointer
                key={idx}
                onClick={() =>
                  states.setHourlyForecast(states?.forecast?.list[item] ?? [])
                }
              >
                <ForeCastCard
                  list={states?.forecast?.list[item][0]}
                  higlight={
                    dayjs(states?.hourlyForecast[0]?.dt_txt ?? "").get("D") ===
                    dayjs(states?.forecast?.list[item][0].dt_txt).get("D")
                  }
                />
              </Pointer>
            ))}
          </NextForecastWrapper>
        </Column>

        <Column css={cssSection}>
          <Row css={customRowCSS}>
            <h2>Today Hourly Forecast</h2>
            {!isHiglightedDateToday && (
              <Pointer onClick={onSetForecastToToday}>Set to Today</Pointer>
            )}
          </Row>
          <NextForecastWrapper css={{ padding: 0 }}>
            {states.hourlyForecast?.map((item, idx) => (
              <Pointer
                key={idx}
                onClick={() => states.setSelectedForecast(item)}
              >
                <ForeCastCard
                  title={dayjs(item.dt_txt).format("HH:mm a")}
                  list={item}
                  higlight={states?.selectedForecast?.dt === item.dt}
                />
              </Pointer>
            ))}
          </NextForecastWrapper>
        </Column>

        <Column css={cssSection}>
          <Column
            css={{
              "h2,h4": { margin: "$8" },
              "@bp1": { flexing: "row", ...customRowCSS },
            }}
          >
            <h2>Selected Highlights</h2>
            <h4>{higlightedDate}</h4>
          </Column>
          <HighlightedCard list={states.selectedForecast} />
        </Column>
      </ForecastWrapper>
    </HomeWrapper>
  );
}
