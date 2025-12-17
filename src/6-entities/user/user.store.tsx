import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { faMedal, faPeopleGroup, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { getApiUrl, options } from '../../7-shared/constants/api.constants';
import { TEAM } from '../spbteam/spbteam.constants';
import { FRIENDS, PRO } from '../allclimber/climbers.constants';
import { IUnregisteredUser, IUser, IVKCodeData, ICustomAllClimber, IClimberGroup } from './user.interfaces';
import { RequestState } from '../../7-shared/types/request.types';
import { useUserGroupsStore } from '../../5-features/editUserAllclimbers/userGroups.store';

interface UserState {
  status: string,
  user: IUser | IUnregisteredUser,
  error: string | null,
  fetchUser: (id: number) => void,
  setUser: (user: IUser) => void,
  login: () => Promise<void>,
  loginVk: (data: IVKCodeData) => Promise<void>,
  getVKProfile: () => Promise<void>,
  logoutVk: () => Promise<void>,
  addDefaultGroupsToUser: () => void,
  fetchUpdateUser: (user: IUser) => Promise<void>,
  saveUserGroups: () => Promise<void>,
  restoreUserGroupsFromUrl: (searchParams: URLSearchParams) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      status: RequestState.PENDING,
      user: {
        groups: [],
      },
      error: null,
      fetchUser: async (id: number) => {
        const res = await fetch(`${getApiUrl()}/users/${id}`) 
        const user = await res.json();
        console.log('User received: ', user);
      },
      setUser: (user: IUser) => {
        set((state: UserState) => ({
          ...state,
          user,
          state: RequestState.SUCCESS,
        }));
    
        if (user?.password && user?.vk_id) {
          sessionStorage.setItem('password', user.password);
          sessionStorage.setItem('vk_id', user.vk_id.toString());
        }
      },

      login: async (): Promise<void> => {
        const vk_id = Number(sessionStorage.getItem('vk_id'));
        const password = sessionStorage.getItem('password');
        if (!vk_id || !password) return;
        return fetch(`${getApiUrl()}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({ vk_id, password }),
          ...options,
        })
          .then(async(res) => {
            switch (res.status) {
              case 200:
              case 201:
                return res.json();
              default:
                return Promise.reject(new Error(`Auth login error: ${res.statusText}`));
            }
          })
          .then(async(vkUser) => {
            await get().setUser(vkUser);
          }).catch((error) => {
            console.warn('Ошибка при логине:', error);
          });
      },

      loginVk: async (data: IVKCodeData) => {
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
                return Promise.reject(new Error(`VK API error: ${res.statusText}`));
            }
          })
          .then(async(vkUser) => {
            await get().setUser(vkUser);
          }).catch((error) => {
            console.warn('Ошибка в цепочке обработки ВК:', error);
          });;
      },

      getVKProfile: async() => {
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
                return Promise.reject(new Error(`VK API error: ${error}`));
            }
          })
          .then(async(vkUser) => {
            await get().setUser(vkUser);
          }).catch((error) => {
            console.warn('Ошибка в цепочке обработки ВК:', error);
          });;
      },
    
      logoutVk: async() => {
        set((state: UserState) => ({
          ...state,
          user: { groups: [] },
        }));
        sessionStorage.clear();
      },

      addDefaultGroupsToUser: async () => {
        if (get().user) return;
        const team = TEAM.filter(({ allClimbId }) => allClimbId).map(({ allClimbId }) => ({ allClimbId }) ) as ICustomAllClimber[];
        await set((state: UserState) => ({
          ...state,
          user: {
            ...state.user,
            groups: [
              {
                id: nanoid(),
                name: 'команда',
                icon: faPeopleGroup,
                items: team,
                offset: 0
              },
              {
                id: nanoid(),
                name: 'друзья',
                icon: faHandshakeAngle,
                items: FRIENDS.map(({ allClimbId }) => ({ allClimbId }) ) as ICustomAllClimber[],
                offset: team.length
              },
              {
                id: nanoid(),
                name: 'про',
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
          set((state: UserState) => ({
            ...state,
            user: {
              ...state.user,
              groups: data.groups,
            },
          }));
          // return data;    
        } catch {
          // toDo: сделать нормальное уведомление
          alert ('fetch error');
        }
      },

      saveUserGroups: async () => {
        const user = get().user as IUser;
        const groups = useUserGroupsStore.getState().groups;
        if (JSON.stringify(user.groups) === JSON.stringify(groups)){
          return;
        }
        if (user?.id) {
          const data = await get().fetchUpdateUser({
            ...user,
            groups,
          } as IUser);
          console.log('User groups changes: ', data);
        } else {
          set((state: UserState) => ({
            ...state,
            user: {
              ...state.user,
              groups,
            },
          }));
        }
      },

      restoreUserGroupsFromUrl: (searchParams: URLSearchParams) => {
        const groupsParam = searchParams.get('share');
        const groups = (groupsParam ? JSON.parse(groupsParam) : []).map((group: IClimberGroup) => ({
          ...group,
          id: nanoid(),
        }));
        set((state: UserState) => ({
          ...state,
          user: {
            ...state.user,
            groups,
          },
        }));
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
      }
    })
  )
)
