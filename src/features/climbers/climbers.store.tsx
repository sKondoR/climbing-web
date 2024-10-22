import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import {
  IClimber,
  IClimbers,
  IPlotsVisibility,
} from './climbers.interfaces'

export interface ClimbersState {
  climbers: IClimbers,
  // isFetchingAllClimb: false,
  fetchClimbers: () => void,
  fetchClimbersAllClimb: (ids: number[], climbers: IClimbers) => void,
  climberPreviewId: number;
  setClimberPreviewId: (id: number) => void,
  plotsVisibility: IPlotsVisibility;
  setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => void,
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set) => ({
      climbers: {},
      climberPreviewId: 0,
      plotsVisibility: {},
      fetchClimbers: async () => {
        const res = await fetch(`${getApiUrl()}/climbers`, options) 
        const data = await res.json();

        set((state: ClimbersState) => ({
          ...state,
          climbers: data.reduce((acc: IClimbers, climber: IClimber) => {
            acc[climber.allClimbId] = climber
            return acc
          }, {}),
          plotsVisibility: data.reduce((acc: IPlotsVisibility, climber: IClimber) => {
            acc[climber.allClimbId] = true
            return acc
          }, {}),
        }));
      },
      fetchClimbersAllClimb: async (ids: number[], climbers: IClimbers) => {
        let i = 0
        while (i < ids.length) {
        // for fast testing
        // while (i < 1) {
          const id = ids[i]
          const res = await getClimber(id, climbers[id]);
          set((state: ClimbersState) => ({
            ...state,
            climbers: {
              ...state.climbers,
              [id]: res,
            },
          }));
          i++;
        }
      },
      setClimberPreviewId: (climberPreviewId: number) => {
        set((state: ClimbersState) => ({
          ...state,
          climberPreviewId,
        }));
      },
      setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => {
        set((state: ClimbersState) => ({
          ...state,
          plotsVisibility,
        }));
      }
    })
  )
)

const getClimber = async (cid: number, existed: IClimber) => {
  const res = await fetch(`${getApiUrl()}/allClimb?id=${cid}`)
  const { name, leads, boulders } = await res.json();
  const existedId = existed?.id;
  const climber = {
    id: existedId || undefined,
    allClimbId: cid,
    name: name || 'test',
    leads,
    boulders,
  };
  await fetch(`${getApiUrl()}/climbers/${existedId || ''}`, {
    ...options,
    method: existedId ? 'PATCH' : 'POST',
    body: JSON.stringify(climber),
  })
  return climber;
}

