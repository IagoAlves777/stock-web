import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LoadingState {
  loading: boolean;
  onLoading: (value: boolean) => void;
}

export const useLoading = create(
  immer<LoadingState>((set) => ({
    loading: false,
    onLoading: (value) => set({ loading: value }),
  })),
);
