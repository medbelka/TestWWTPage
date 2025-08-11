import { create } from 'zustand';
import { SearchRequestFilter } from '../shared/api/types/SearchRequest/SearchRequestFilter';

interface FilterState {
  selectedFilters: SearchRequestFilter;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setFilters: (filters: SearchRequestFilter) => void;
}

export const useFilter = create<FilterState>((set) => ({
  selectedFilters: [],
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  setFilters: (filters) => set({ selectedFilters: filters }),
}));
