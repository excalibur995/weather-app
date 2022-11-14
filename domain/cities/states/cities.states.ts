import create from "zustand";
import { CitiesStates } from "../entities/cities.entities";

export const useCitiesStates = create<CitiesStates>()((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
