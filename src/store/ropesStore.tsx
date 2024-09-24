import { create } from 'zustand'

interface RopesState {
  ropes: number
  increase: (by: number) => void
}

export const useRopesStore = create<RopesState>()((set) => ({
  ropes: 0,
  increase: (by) => set((state) => ({ ropes: state.ropes + by })),
}))