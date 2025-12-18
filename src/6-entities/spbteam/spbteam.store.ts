import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getApiUrl, options } from '../../7-shared/constants/api.constants';
import {
  ITeamMember,
} from './spbteam.interfaces';
import { useNotificationsStore } from '../notification/notification.store';

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
        const url = `${getApiUrl()}/team`;
        try {
          const res = await fetch(url, options) 
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
        } catch (error) {
          set((state: TeamState) => ({
            ...state,
            isFetchingAllClimb: false,
          }));
          useNotificationsStore.getState().addNotification({
            type: 'error',
            message: `Ошибка загрузки fetchTeam: ${url}`,
            code: error as string,
          })
        }
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
