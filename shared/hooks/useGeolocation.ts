import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Coordinates } from "shared/entities";

export default function useGeoLocation() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lon: null,
  });
  return useQuery(["using-geo-location", coordinates], async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setCoordinates(coordinates);
    });
    return {
      coordinates,
      isNotAllowingGeolocation: !coordinates?.lat && !coordinates?.lon,
    };
  });
}
