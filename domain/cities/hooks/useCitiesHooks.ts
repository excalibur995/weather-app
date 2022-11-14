import { useQuery } from "@tanstack/react-query";
import { Parameters } from "shared/entities";
import { isEmptyOrSpaces } from "shared/utils";
import { fetchCitiesByName } from "../services/cities.service";

export function useSearchCities(param: Required<Pick<Parameters, "search">>) {
  return useQuery(
    ["use-citites", { ...param }],
    () => fetchCitiesByName(param),
    {
      enabled: !isEmptyOrSpaces(param.search),
      initialData: [],
    }
  );
}
