import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getApiUrl, options } from '../../constants/api.constants'
import { ILeadTraining, IScores } from './lead-training.interfaces'
import { calcScores } from './lead-training.utils';
import { DEFAULT_C1, DEFAULT_C2 } from './lead-training.constants';

export interface LeadTrainingState {
  trainings: ILeadTraining[],
  setLeadTraining: (training: ILeadTraining) => void,
  isLeadTrainingFetching: boolean,
  fetchLeadTraining: (userId: number) => void,
  scoreSettings: number[],
  setScoreSettings: (scores: number[]) => void,
  scores: IScores,
  setScores: (scores: IScores) => void,
  selectedDate: string | null,
  setSelectedDate: (scores: string | null) => void,
}

export const useLeadTrainingStore = create<LeadTrainingState>()(
  devtools(
    (set) => ({
      trainings: [],
      isLeadTrainingFetching: false,
      scoreSettings: [DEFAULT_C1, DEFAULT_C2],
      scores: calcScores(DEFAULT_C1, DEFAULT_C2),
      selectedDate: null,
      setSelectedDate: (selectedDate: string | null) => {
        set((state: LeadTrainingState) => ({
          ...state,
          selectedDate,
        })); 
      },
      setLeadTraining: async (training: ILeadTraining) => {
        try {
          const res = await fetch(`${getApiUrl()}/lead-training${training.id ? `/${training.id}` : ''}`, {
            ...options,
            method: training.id ? 'PATCH' : 'POST',
            body: JSON.stringify(training),
          })
          const data = await res?.json();
          console.log('setLeadTraining: ', data)      
        } catch (error) {
          set((state: LeadTrainingState) => ({
            ...state,
            isLeadTrainingFetching: false,
          }));
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
          set({ isLeadTrainingFetching: true })
          console.error(error)
        }
      },
      setScoreSettings: (scoreSettings: number[]) => {
        set((state: LeadTrainingState) => ({
          ...state,
          scoreSettings,
        })); 
      },
      setScores: (scores: IScores) => {
        set((state: LeadTrainingState) => ({
          ...state,
          scores,
        })); 
      },
    }),
  )
)
