import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import {
  ITeamMember,
} from './team.interfaces'

export interface TeamState {
  coaches: ITeamMember[],
  team: ITeamMember[],
  fetchTeam: () => void,
  previewId: number;
  setPreviewId: (id: number) => void,
}

export const useTeamStore = create<TeamState>()(
  devtools(
    (set) => ({
      coaches: [],
      team: [],
      previewId: 0,
      fetchTeam: async () => {
        const res = await fetch(`${getApiUrl()}/team`, options) 
        const data = await res.json();

        set((state: TeamState) => ({
          ...state,
          coaches: [],
          team: data,
        }));
      },
      setPreviewId: (previewId: number) => {
        set((state: TeamState) => ({
          ...state,
          previewId,
        }));
      }
    })
  )
)
