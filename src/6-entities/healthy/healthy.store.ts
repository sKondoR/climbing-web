import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getApiUrl, options } from '../../7-shared/constants/api.constants';

export interface HealthState {
  isHealthy: boolean,
  isHealthyFetching: boolean,
  fetchHealthy: () => void,
}

export const useHealthyStore = create<HealthState>()(
  devtools(
    (set) => ({
      isHealthy: true,
      isHealthyFetching: false,
      
      fetchHealthy: async () => {
        try {
          set((state: HealthState) => ({
            ...state,
            isFetchingAllClimb: true,
          }));
          const res = await fetch(`${getApiUrl()}/healthy`, options); 
          const data = await res.json();
          if (data.status === 'error') {
            alert('Database is not available. Please try again later.');
            set((state: HealthState) => ({
              ...state,
              isHealthy: false,
              isFetchingAllClimb: false,
            }));
          }
        } catch {
          alert('Service unreachable.');
          set((state: HealthState) => ({
            ...state,
            isHealthy: false,
            isFetchingAllClimb: false,
          }));
        }
      },
    })
  )
)
