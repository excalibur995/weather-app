import { AxiosResponse } from "axios";
import RequestServices from "drivers/http-request";
import { Parameters } from "shared/entities";
import { Cities } from "../entities/cities.entities";

export async function fetchCitiesByName(
  params: Required<Pick<Parameters, "search">>
) {
  const services = new RequestServices();
  const serviceParams = {
    q: params.search,
    limit: 0,
    appid: process.env.NEXT_PUBLIC_API_KEY,
  };
  const request = await services.getRequest<{}, AxiosResponse<Cities[]>>({
    params: serviceParams,
    path: process.env.NEXT_PUBLIC_API_GE0 + `direct`,
  });
  return request.data;
}
