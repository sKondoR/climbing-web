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
          coaches: data.filter(({ isCoach }: ITeamMember) => isCoach),
          team: data.filter(({ isCoach }: ITeamMember) => !isCoach)
            .sort((a: ITeamMember, b: ITeamMember) => {
              const aTrue = a.isCityTeam === true;
              const bTrue = b.isCityTeam === true;
              if ( aTrue < bTrue ){
                return 1;
              }
              if ( aTrue > bTrue ){
                return -1;
              }
              return 0;
            }),
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
