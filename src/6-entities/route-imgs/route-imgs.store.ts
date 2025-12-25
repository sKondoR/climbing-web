import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { useNotificationsStore } from '../notification/notification.store';
import { IRouteImg, ISearchRoute } from './route-imgs.interfaces';
import { getApiUrl, options } from '../../7-shared/constants/api.constants';

export interface RouteImgsStoreState {
  routeImgs: Record<string, IRouteImg>;
  fetchRouteImg: (route: ISearchRoute) => void;
}

export const useRouteImgsStore = create<RouteImgsStoreState>()(
  devtools(
    (set, get) => ({
      routeImgs: {},
      fetchRouteImg: async (route: ISearchRoute) => {
        const { routeImgs } = get();
        const id = `${route.name}-${route.region}`;
        const imageData = routeImgs[id]?.imageData;
          if (imageData) {
            return;
          }
        set((state) => ({
          routeImgs: {
            ...state.routeImgs,
            [id]: { ...state.routeImgs[id], isFetching: true },
          },
        }));
        const url = `${getApiUrl()}/route-imgs/${id}`;
        try { 
          // Сохраняем в БД
          const res = await fetch(url, {
            ...options,
            method: 'GET',
          });
          const data = await res.json();

          // Обновляем состояние
          set((state) => ({
            routeImgs: {
              ...state.routeImgs,
              [id]: { ...data, isFetching: false }
            },
          }));
        } catch (error) {
          set((state) => ({
            routeImgs: {
              ...state.routeImgs,
              [id]: { ...state.routeImgs[id], isFetching: true },
            },
          }));
          useNotificationsStore.getState().addNotification({
            type: 'error',
            message: `Ошибка загрузки fetchRouteImg: ${url}`,
            code: error as string,
          });
        }
      },
    })
  )
)

