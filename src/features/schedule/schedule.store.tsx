import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import {
  IEvent,
} from './schedule.interfaces'

export interface ScheduleState {
  schedule: IEvent[],
  isScheduleFetching: boolean,
  fetchSchedule: () => void,
}

export const useScheduleStore = create<ScheduleState>()(
  devtools(
    (set) => ({
      schedule: [],
      isScheduleFetching: false,
      fetchSchedule: async () => {
        set((state: ScheduleState) => ({
          ...state,
          isScheduleFetching: true,
        }));
        try {
          const res = await fetch(`${getApiUrl()}/schedule`, options) 
          const data = await res.json();
          set((state: ScheduleState) => ({
            ...state,
            schedule: data,
            isScheduleFetching: false,
          }));          
        } catch (error) {
          set({ isScheduleFetching: true });
          console.error(error)
        }
      }
    })
  )
)
