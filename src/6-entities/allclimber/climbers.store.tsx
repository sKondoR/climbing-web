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
export interface ClimbersState {
  climbers: IClimbers,
  isFetchingAllClimb: boolean,
  fetchClimbers: () => void,
  fetchClimbersAllClimb: (ids?: number[]) => void,
  allClimbFetchStatus: string,
  setAllClimbFetchStatus: (status: string) => void;
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set, get) => ({
      climbers: {},
      isFetchingAllClimb: false,
      allClimbFetchStatus: '',

      fetchClimbers: async () => {
        try {
          set((state: ClimbersState) => ({
            ...state,
            isFetchingAllClimb: true,
          }));
          const res = await fetch(`${getApiUrl()}/climbers`, options) 
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
        } catch {
          set((state: ClimbersState) => ({
            ...state,
            isFetchingAllClimb: false,
          }));
          // toDo: сделать нормальное уведомление
          alert ('fetch error');
        }
      },

      setAllClimbFetchStatus: (status: string) => {
        set((state: ClimbersState) => ({
            ...state,
            allClimbFetchStatus: status,
        }));
      },
      
      fetchClimbersAllClimb: async (currentIds?: number[]) => {
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
            if (!res.ok) continue;

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
            await fetch(`${getApiUrl()}/climbers/${existed?.id || ''}`, {
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
            console.error(`Error fetching climber ${id}:`, error);
          }
        }
        setAllClimbFetchStatus('');
      }
    })
  )
)

