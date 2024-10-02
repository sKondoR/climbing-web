import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import {
  IClimber,
  IClimbers,
} from './climbers.interfaces'

export interface ClimbersState {
  climbers: IClimbers,
  fetchClimbers: () => void,
  fetchClimbersAllClimb: (ids: number[], climbers: IClimbers) => void,
  climberPreviewId: number;
  setClimberPreviewId: (id: number) => void,
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set) => ({
      climbers: {},
      climberPreviewId: 0,
      fetchClimbers: async () => {
        const res = await fetch(`${getApiUrl()}/climbers`, options) 
        const data = await res.json();

        set((state: ClimbersState) => ({
          ...state,
          climbers: data.reduce((acc: IClimbers, climber: IClimber) => {
            acc[climber.allClimbId] = climber
            return acc
          }, {}),
        }));
      },
      fetchClimbersAllClimb: async (ids: number[], climbers: IClimbers) => {
        let i = 0;
        while (i < ids.length) {
          const id = ids[i];
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
    updatedAt: new Date().toDateString(),
  };
  await fetch(`${getApiUrl()}/climbers/${existedId || ''}`, {
    ...options,
    method: existedId ? 'PATCH' : 'POST',
    body: JSON.stringify(climber),
  })
  return climber;
}

