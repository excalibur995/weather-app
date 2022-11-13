import { useQuery } from "@tanstack/react-query";
import { ForecastHooksParams } from "../entities/forecast";
import { fetchForecastByCoords, result } from "../services/forecast.service";

export function useForecastHooks(param: ForecastHooksParams) {
  return useQuery(
    ["use-forecast-data-by-coords", { ...param }],
    () => fetchForecastByCoords(param.params),
    {
      enabled: param.enabled,
      refetchInterval: 5 * 60 * 1000,
      select(response) {
        return {
          ...response.data,
          list: result(response.data.list),
        };
      },
      onSuccess(data) {
        param.onSuccess(data);
      },
    }
  );
}
