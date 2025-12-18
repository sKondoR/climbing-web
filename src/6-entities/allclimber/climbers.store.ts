import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../7-shared/constants/api.constants'
import {
  IClimber,
  IClimbers,
} from './climbers.interfaces';
import { useUserStore } from '../user/user.store';
import { useLayoutStore } from '../layout/layout.store';
import { IPlotsVisibility } from '../layout/layout.interfaces';
import { getClimbersIds } from './climbers.utils';
import { useNotificationsStore } from '../notification/notification.store';
export interface ClimbersState {
  climbers: IClimbers,
  isFetchingAllClimb: boolean,
  fetchClimbers: () => void,
  fetchClimbersAllclimb: (ids?: number[]) => void,
  allClimbFetchStatus: string,
  setAllClimbFetchStatus: (status: string) => void;
  fetchNewClimbersAllclimb: () => void,
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set, get) => ({
      climbers: {},
      isFetchingAllClimb: false,
      allClimbFetchStatus: '',

      fetchClimbers: async () => {
        const url = `${getApiUrl()}/climbers`;
        try {
          set((state: ClimbersState) => ({
            ...state,
            isFetchingAllClimb: true,
          }));
          const res = await fetch(url, options) 
          const data = await res.json();
          console.log('fetchClimbers', data);
          set((state: ClimbersState) => ({
            ...state,
            isFetchingAllClimb: false,
            climbers: data.reduce((acc: IClimbers, climber: IClimber) => {
              acc[climber.allClimbId] = climber
              return acc
            }, {}),
          }));
          useLayoutStore.getState().setPlotsVisibility(data.reduce((acc: IPlotsVisibility, climber: IClimber) => {
              acc[climber.allClimbId] = true
              return acc
            }, {}),);
        } catch (error) {
          set((state: ClimbersState) => ({
            ...state,
            isFetchingAllClimb: false,
          }));
          useNotificationsStore.getState().addNotification({
            type: 'error',
            message: `Ошибка загрузки fetchClimbers: ${url}`,
            code: error as string,
          });
        }
      },

      setAllClimbFetchStatus: (status: string) => {
        set((state: ClimbersState) => ({
            ...state,
            allClimbFetchStatus: status,
        }));
      },
      
      fetchClimbersAllclimb: async (currentIds?: number[]) => {
        const { climbers, setAllClimbFetchStatus } = get();
        const { climberPreviewId } = useLayoutStore.getState();
        const { user } = useUserStore.getState();

        let ids = currentIds || getClimbersIds(user);
        if (climberPreviewId || climberPreviewId === 0) {
          ids = [ids[climberPreviewId]];
        }

        if (!ids?.length) {
          return;
        }

        setAllClimbFetchStatus(`0/${ids.length}`);
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          if (!id) return;
          try {
            const res = await fetch(`${getApiUrl()}/allClimb?id=${id}`, options);
            if (!res.ok) {
              continue;
            };

            const { name, leads, boulders, routesCount, scores } = await res.json();

            if (!name) {
              console.log(`Allclimb ${id} не требует обновления`);
              setAllClimbFetchStatus(`${i+1}/${ids.length}`);
              continue;
            }

            const existed = climbers[id];
            // toDo: упростить
            const climberData = {
              id: existed?.id,
              allClimbId: id,
              name,
              leads,
              boulders,
              routesCount,
              scores,
            };

            // Сохраняем в БД
            await fetch(`${getApiUrl()}/climbers${existed?.id ? `/${existed.id}` : ''}`, {
              ...options,
              method: existed?.id ? 'PATCH' : 'POST',
              body: JSON.stringify(climberData),
            });

            // Обновляем состояние
            set((state) => ({
              climbers: {
                ...state.climbers,
                [id]: { ...existed, ...climberData },
              },
              allClimbFetchStatus: `${i+1}/${ids.length}`,
            }));
          } catch (error) {
            // toDO: сделать нормальное уведомление
            console.error(`Ошибка загрузки ${id}:`, error);
          }
        }
        setAllClimbFetchStatus('');
      },

      fetchNewClimbersAllclimb: () => {
        const { climbers } = get();
        const existedIds = Object.keys(climbers).map(Number);
        const { user } = useUserStore.getState();
        const newIds = getClimbersIds(user).filter(id => !existedIds.includes(id));
        if (newIds.length) {
          get().fetchClimbersAllclimb(newIds);
        }        
      },
    }),
  )
)

