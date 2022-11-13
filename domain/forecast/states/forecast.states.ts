import create from "zustand";
import dayjs from "dayjs";
import { ForecastStates } from "../entities/forecast";
import { filterTodayForecast } from "../services/forecast.service";
import { filterTodayData } from "../services/forecast.service";

export const useBookParamState = create<ForecastStates>()((set) => ({
  forecast: undefined,
  hourlyForecast: [],
  forecastCity: undefined,
  forecastList: undefined,
  todayForecast: [],
  units: "metric",
  selectedForecast: undefined,
  setHourlyForecast(list) {
    set({ hourlyForecast: list, selectedForecast: list[0] });
  },
  setSelectedForecast(list) {
    set({
      selectedForecast: list,
    });
  },
  setUnits(units) {
    set({ units });
  },
  setForecast(forecast) {
    const todayForecast = filterTodayData(
      forecast.list[dayjs().format("DD_MM_YYYY")]
    );
    set({
      forecast,
      todayForecast,
      forecastCity: forecast.city,
      forecastList: filterTodayForecast(forecast.list),
      hourlyForecast: forecast.list[dayjs().format("DD_MM_YYYY")],
      selectedForecast: todayForecast[todayForecast.length - 1],
    });
  },
}));
