import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  IPlotsVisibility,
} from './layout.interfaces'

export interface LayoutState {
  climberPreviewId: number | null;
  setClimberPreviewId: (id: number | null) => void,
  plotsVisibility: IPlotsVisibility;
  setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => void,
  isUserEdit: boolean;
  setIsUserEdit: (isUserEdit: boolean) => void,
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    (set) => ({
      climberPreviewId: null,
      setClimberPreviewId: (climberPreviewId: LayoutState['climberPreviewId']) => {
        set((state: LayoutState) => ({
          ...state,
          climberPreviewId,
        }));
      },
      plotsVisibility: {},
      setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => {
        set((state: LayoutState) => ({
          ...state,
          plotsVisibility,
        }));
      },
      isUserEdit: false,
      setIsUserEdit: (isUserEdit: boolean) => {
        set((state: LayoutState) => ({
          ...state,
          isUserEdit,
        }));
      }
    })
  )
)

