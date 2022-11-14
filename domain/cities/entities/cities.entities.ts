export interface CitiesStates {
  search: string;
  setSearch: (search: string) => void;
}

export interface Cities {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
