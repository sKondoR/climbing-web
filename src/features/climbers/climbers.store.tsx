import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import {
  IClimber,
  IClimbers,
  IPlotsVisibility,
} from './climbers.interfaces'

export interface ClimbersState {
  climbers: IClimbers,
  // isFetchingAllClimb: false,
  fetchClimbers: () => void,
  fetchClimbersAllClimb: (ids: number[]) => void,
  allClimbFetchStatus: string,
  climberPreviewId: number | null;
  setClimberPreviewId: (id: number | null) => void,
  plotsVisibility: IPlotsVisibility;
  setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => void,
  setAllClimbFetchStatus: (status: string) => void;
}

export const useClimbersStore = create<ClimbersState>()(
  devtools(
    (set, get) => ({
      climbers: {},
      climberPreviewId: null,
      plotsVisibility: {},
      allClimbFetchStatus: '',
      fetchClimbers: async () => {
        try {
          const res = await fetch(`${getApiUrl()}/climbers`, options) 
          const data = await res.json();
          console.log('fetchClimbers', data);
          set((state: ClimbersState) => ({
            ...state,
            climbers: data.reduce((acc: IClimbers, climber: IClimber) => {
              acc[climber.allClimbId] = climber
              return acc
            }, {}),
            plotsVisibility: data.reduce((acc: IPlotsVisibility, climber: IClimber) => {
              acc[climber.allClimbId] = true
              return acc
            }, {}),
          }));
        } catch {
          alert ('fetch error');
        }
      },

      setAllClimbFetchStatus: (status: string) => {
        set((state: ClimbersState) => ({
            ...state,
            allClimbFetchStatus: status,
        }));
      },
      
      fetchClimbersAllClimb: async (ids: number[]) => {
        const { climbers, setAllClimbFetchStatus } = get();

        setAllClimbFetchStatus(`0/${ids.length}`);
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          try {
            const res = await fetch(`${getApiUrl()}/allClimb?id=${id}`);
            if (!res.ok) continue;

            const { name, leads, boulders, routesCount } = await res.json();

            if (!name) {
              console.log(`Allclimb ${id} is up-to-date`);
              setAllClimbFetchStatus(`${i+1}/${ids.length}`);
              continue;
            }

            const existed = climbers[id];
            const climberData = {
              id: existed?.id,
              allClimbId: id,
              name,
              leads,
              boulders,
              routesCount,
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
            console.error(`Error fetching climber ${id}:`, error);
          }
        }
        setAllClimbFetchStatus('');
      },
      setClimberPreviewId: (climberPreviewId: ClimbersState['climberPreviewId']) => {
        set((state: ClimbersState) => ({
          ...state,
          climberPreviewId,
        }));
      },
      setPlotsVisibility: (plotsVisibility: IPlotsVisibility) => {
        set((state: ClimbersState) => ({
          ...state,
          plotsVisibility,
        }));
      }
    })
  )
)

