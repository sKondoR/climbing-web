import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { faMedal, faPeopleGroup, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

import { getApiUrl, options } from '../../7-shared/constants/api.constants';
import { TEAM } from '../spbteam/spbteam.constants';
import { FRIENDS, PRO } from '../allclimber/climbers.constants';
import { IUnregisteredUser, IUser, IVKCodeData, ICustomAllClimber } from './user.interfaces';
import { RequestState } from '../../7-shared/types/request.types';
import { useUserGroupsStore } from '../../5-features/editUserAllclimbers/userGroups.store';

interface UserState {
  status: string,
  user: IUnregisteredUser,
  vkUser: IUser | null,
  error: string | null,
  changeState: (property: string, value: string | null) => void,
  fetchUser: (id: number) => void,
  setVKUser: (user: IUser) => void,
  loginVk: (data: IVKCodeData) => Promise<void>,
  getVKProfile: () => Promise<void>,
  logoutVk: () => Promise<void>,
  addDefaultGroupsToUser: () => void,
  fetchUpdateUser: (user: IUser) => Promise<void>,
  saveUserGroups: () => Promise<void>,
};

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      status: RequestState.PENDING,
      user: {
        id: 1,
        grant: 1,
        allClimbId: null,
        groups: [],
      },
      vkUser: null,
      error: null,
      changeState: (property: string, value: string | null) => {
        set((state: UserState) => ({
          ...state,
          [property]: value,
        }));
      },
      fetchUser: async (id: number) => {
        const res = await fetch(`${getApiUrl()}/users/${id}`) 
        const vkUser = await res.json();
        console.log('vkUser received: ', vkUser)
        await get().changeState('vkUser', vkUser);
      },
      setVKUser: (vkUser: IUser) => {
        set((state: UserState) => ({
          ...state,
          vkUser,
          state: RequestState.SUCCESS,
        }));

        console.log('vkUser', vkUser)
    
        if (vkUser?.['token']) {
          sessionStorage.setItem('token', vkUser?.token);
        }
      },
      loginVk: async (data: IVKCodeData) => {
        await get().changeState('status', RequestState.LOADING);
        return fetch(`${getApiUrl()}/auth/login/vk`, {
          method: 'POST',
          body: JSON.stringify(data),
          ...options,
        })
          .then(async(res) => {
            switch (res.status) {
              case 200:
              case 201:
                return res.json();
              default:
                const error = `VK API error: ${res.statusText}`
                await get().changeState('error', error);
                return Promise.reject(new Error(`VK API error: ${error}`));
            }
          })
          .then(async(vkUser) => {
            await get().setVKUser(vkUser);
          }).catch((error) => {
            console.warn('Ошибка в цепочке обработки ВК:', error);
          });;
      },

      getVKProfile: async() => {
        await get().changeState('status', RequestState.LOADING);
        const token = sessionStorage.getItem('token');
    
        if (!token) Promise.reject();
    
        return fetch(`${getApiUrl()}/users/profile`, {
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async(res) => {
            switch (res.status) {
              case 200:
              case 201:
                return res.json();
              default:
                const error = `VK API error: ${res.statusText}`
                await get().changeState('error', error);
                return Promise.reject(new Error(`VK API error: ${error}`));
            }
          })
          .then(async(vkUser) => {
            await get().setVKUser(vkUser);
          }).catch((error) => {
            console.warn('Ошибка в цепочке обработки ВК:', error);
          });;
      },
    
      logoutVk: async() => {
        await get().changeState('vkUser', null);
        sessionStorage.clear();
        await get().changeState('status', RequestState.PENDING);
      },

      addDefaultGroupsToUser: async () => {
        if (get().vkUser) return;
        const team = TEAM.filter(({ allClimbId }) => allClimbId).map(({ allClimbId }) => ({ allClimbId }) ) as ICustomAllClimber[];
        await set((state: UserState) => ({
          ...state,
          user: {
            ...state.user,
            groups: [
              {
                name: 'команда',
                icon: faPeopleGroup,
                items: team,
                offset: 0
              },
              {
                name: 'друзья',
                icon: faHandshakeAngle,
                items: FRIENDS.map(({ allClimbId }) => ({ allClimbId }) ) as ICustomAllClimber[],
                offset: team.length
              },
              {
                name: 'про-спортсмены',
                icon: faMedal,
                items: PRO.map(({ allClimbId }) => ({ allClimbId }) ) as ICustomAllClimber[],
                offset: team.length + FRIENDS.length
              }
            ],
          },
        }));
      },

      fetchUpdateUser: async (userData: Partial<IUser>): Promise<void> => {
        try {
          const res = await fetch(`${getApiUrl()}/users/${userData.id}`, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(userData),
          });
          const data: IUser = await res.json();
          console.log('fetchUpdateUser', data);
          set((state: UserState) => ({
            ...state,
            user: {
              ...state.user,
              groups: data.groups,
            },
          }));
          // return data;    
        } catch {
          alert ('fetch error');
        }
      },

      saveUserGroups: async () => {
        const user = get().user;
        const groups = useUserGroupsStore.getState().groups;

        const data = await get().fetchUpdateUser({
          ...user,
          groups,
        } as IUser);

        console.log('User groups changes: ', data);
      },
    })
  )
)
