import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getApiUrl, options } from '../../constants/api.constants'
import { ITrainingDay, ITrainingRequest } from './lead-training.interfaces'

export interface LeadTrainingState {
  trainings: ITrainingDay[],
  isLeadTrainingFetching: boolean,
  setLeadTraining: (training: ITrainingRequest) => void,
  fetchLeadTraining: (userId: number) => void,
}

export const useLeadTrainingStore = create<LeadTrainingState>()(
  devtools(
    (set) => ({
      trainings: [],
      isLeadTrainingFetching: false,
      setLeadTraining: async (training: ITrainingRequest) => {
        try {
          const res = await fetch(`${getApiUrl()}/lead-training/${training.userId}`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(training),
          })
          const data = await res.json();
          console.log('setLeadTraining: ' , data);        
        } catch (error) {
          set({ isLeadTrainingFetching: true });
          console.error(error)
        }
      },
      fetchLeadTraining: async (userId: number) => {
        set((state: LeadTrainingState) => ({
          ...state,
          isLeadTrainingFetching: true,
        }));
        try {
          const res = await fetch(`${getApiUrl()}/lead-training/${userId}`, options) 
          const data = await res.json();
          set((state: LeadTrainingState) => ({
            ...state,
            trainings: data,
            isLeadTrainingFetching: false,
          }));          
        } catch (error) {
          set({ isLeadTrainingFetching: true });
          console.error(error)
        }
      }
    })
  )
)