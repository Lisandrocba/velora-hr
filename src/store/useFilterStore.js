import { create } from "zustand";

const useFiltersStore = create((set, get) => ({
  searchInput: "",
  searchTerm: "",
  selectedType: "",

  isSearching: () => get().searchTerm.length > 0,
  hasActiveFilters: () =>
    get().searchTerm.length > 0 || get().selectedType.length > 0,

  setSearchInput: (searchInput) => set({ searchInput }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  setSelectedType: (selectedType) => set({ selectedType }),

  executeSearch: () => {
    const { searchInput } = get();
    set({ searchTerm: searchInput.trim().toLowerCase() });
  },

  clearFilters: () =>
    set({
      searchInput: "",
      searchTerm: "",
      selectedType: "",
    }),

  clearSearch: () =>
    set({
      searchInput: "",
      searchTerm: "",
    }),
}));

export default useFiltersStore;
