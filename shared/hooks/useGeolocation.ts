import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "shared/entities";

export type GeoLocationProps = {
  callBack?: (coordinates: Coordinates) => void;
};
export default function useGeoLocation(props: GeoLocationProps) {
  return useQuery(["using-geo-location"], async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      props.callBack?.(coordinates);
    });
    return {};
  });
}
