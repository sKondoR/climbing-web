import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { API_URL, options } from '../../constants/api.constants'
import {
  IClimber,
  IClimbers,
} from './climbers.interfaces'

interface ClimbersState {
  climbers: IClimbers,
  fetchClimbers: () => void,
  fetchClimbersAllClimb: (ids: number[]) => void,
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set) => ({
      climbers: {},
      fetchClimbers: async () => {
        const res = await fetch(`${API_URL}/climbers`, options) 
        const data = await res.json();

        set((state: ClimbersState) => ({
          ...state,
          climbers: data.reduce((acc: IClimbers, climber: IClimber) => {
            acc[climber.allClimbId] = climber
            return acc
          }, {}),
        }));
      },
      fetchClimbersAllClimb: async (ids: number[]) => {
        ids.forEach(async (id) => {
          set((state: ClimbersState) => ({
            ...state,
            climbers: {
              ...state.climbers,
              [id]: getClimber(id, state.climbers?.[id])
            },
          }));
        })
      },
    })
  )
)

const getClimber = async (cid: number, existed: IClimber) => {
  const res = await fetch(`${API_URL}/allClimb?id=${cid}`)
  const { name, leads, boulders } = await res.json();
  const climber = {
    id: existed?.id || undefined,
    allClimbId: cid,
    name: name || 'test',
    leads,
    boulders,
    updatedAt: new Date().toDateString(),
  };
  await fetch(`${API_URL}/climbers${existed ? `/${existed?.id}` : ''}`, {
    ...options,
    method: existed ? 'PATCH' : 'POST',
    body: JSON.stringify(climber),
  })
  return climber;
}

