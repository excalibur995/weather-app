import dayjs from "dayjs";
import isTomorrow from "dayjs/plugin/isTomorrow";
import RequestServices from "drivers/http-request";

import { AxiosResponse } from "axios";
import { Coordinates, Parameters } from "shared/entities";
import { Forecast, List, ModifiedList } from "../entities/forecast";
import { groupBy } from "lodash";

export const STANDARD_FORMAT = "DD_MM_YYYY";
export const isToday = dayjs().format(STANDARD_FORMAT);

export function fetchForecastByCoords(
  params: Coordinates & Partial<Pick<Parameters, "units">>
) {
  const services = new RequestServices();
  const serviceParams = { ...params, appid: process.env.NEXT_PUBLIC_API_KEY };
  return services.getRequest<{}, AxiosResponse<Forecast>>({
    params: serviceParams,
    path: process.env.NEXT_PUBLIC_API_DATA + `forecast`,
  });
}

export const result = (arr: List[]) => {
  return groupBy(arr, (monthName) =>
    dayjs(monthName.dt_txt).format(STANDARD_FORMAT)
  );
};

export const filterTodayData = (list: List[]) => {
  const today = dayjs();
  const beforeToday = [...list].filter(
    (item) =>
      dayjs(item.dt_txt).isBefore(today) || dayjs(item.dt_txt).isSame(today)
  );
  if (beforeToday.length < 1) {
    beforeToday.push(list[0]);
  }
  return beforeToday;
};

export const filterTodayForecast = (forecast: ModifiedList) => {
  const newForecast: Record<string, List[]> = {};
  for (const key in forecast) {
    if (key !== isToday) {
      newForecast[key] = forecast[key];
    }
  }
  return newForecast;
};

export const mutateTomorrowDate = (
  dt_txt?: string,
  titleFormat: string = "ddd, DD MMM"
) => {
  if (dt_txt) {
    dayjs.extend(isTomorrow);
    const day = dayjs(dt_txt);
    if (day.isTomorrow()) {
      return "Tommorow";
    }
    return day.format(titleFormat);
  }
  return "";
};
