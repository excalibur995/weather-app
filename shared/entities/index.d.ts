export type Coordinates = {
  lat: number | null;
  lon: number | null;
};

export interface Parameters {
  cnt: number;
  lat: number;
  lon: number;
  limit: number;
  units: "standard" | "metric" | "imperial";
}
