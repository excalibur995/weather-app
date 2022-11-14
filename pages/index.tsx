import useGeoLocation from "shared/hooks/useGeolocation";
import TodaysForecastCard from "components/Card/TodaysForecastCard";
import ForeCastCard from "components/Card/ForeCastCard";
import HighlightedCard from "components/Card/HighlightedCard";
import dynamic from "next/dynamic";
import SearchInput from "components/SearchInput/SearchInput";
import useToggle from "shared/hooks/useToggle";
import dayjs from "dayjs";
import { useForecastHooks } from "domain/forecast/hooks/useForecastHook";
import { useBookParamState } from "domain/forecast/states/forecast.states";
import {
  DrawerSeacrhSection,
  ForecastWrapper,
  HomeWrapper,
  NextForecastWrapper,
  TodaysForeCast,
} from "styles/Home.styled";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import {
  Column,
  ListItem,
  ListWrapper,
  Pointer,
  Row,
} from "styles/Shared.styles";
import { CSS } from "@stitches/react";
import { useMemo, useState } from "react";
import { useCitiesStates } from "domain/cities/states/cities.states";
import { useSearchCities } from "domain/cities/hooks/useCitiesHooks";
import { getRegionNames } from "shared/utils";
import { Coordinates } from "shared/entities";

//@ts-ignore
const Drawer = dynamic(() => import("components/Drawer/Drawer"), {
  ssr: false,
});

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
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const { isFetching, refetch } = useGeoLocation({
    callBack: setCoordinates,
  });
  const { value: open, setFalse, setTrue } = useToggle();
  const states = useBookParamState((state) => state);
  const cities = useCitiesStates((state) => state);

  const isNotAllowingGeolocation = useMemo(
    () => !coordinates?.lat && !coordinates?.lon,
    [coordinates]
  );

  useForecastHooks({
    params: { ...coordinates!, units: states.units } || {
      lat: 0,
      lon: 0,
      units: states.units,
    },
    enabled: !isFetching && !isNotAllowingGeolocation,
    onSuccess: states.setForecast,
  });

  const { data: citiesList } = useSearchCities({ search: cities.search });

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

  const handleCloseDrawer = () => {
    setFalse();
    cities.setSearch("");
  };

  const handleCitiesCoordinates = (coordinates: Coordinates) => {
    setCoordinates(coordinates);
    handleCloseDrawer();
  };

  return (
    <>
      <HomeWrapper>
        <TodaysForeCast>
          <Row css={{ justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={setTrue}>Search for Places</button>
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
                      dayjs(states?.hourlyForecast[0]?.dt_txt ?? "").get(
                        "D"
                      ) ===
                      dayjs(states?.forecast?.list[item][0].dt_txt).get("D")
                    }
                  />
                </Pointer>
              ))}
            </NextForecastWrapper>
          </Column>

          <Column css={cssSection}>
            <Row css={customRowCSS}>
              <h2>Hourly Forecast</h2>
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
      <Drawer open={open} direction="left">
        <DrawerSeacrhSection>
          <SearchInput
            placeholder="Type in City Name"
            onChangeEnter={cities.setSearch}
          />
          <AiOutlineCloseCircle size={20} onClick={handleCloseDrawer} />
        </DrawerSeacrhSection>
        <ListWrapper>
          {citiesList.map((city, idx) => (
            <ListItem
              onClick={() =>
                handleCitiesCoordinates({ lat: city.lat, lon: city.lon })
              }
              key={idx}
            >
              {`${city.name ? city.name + ", " : ""} `}
              {`${city.state ? city.state + ", " : ""}`}
              {`${city.country ? getRegionNames(city.country) : ""}`}
            </ListItem>
          ))}
        </ListWrapper>
      </Drawer>
    </>
  );
}
