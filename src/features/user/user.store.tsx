import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options, TEAM } from '../../constants/api.constants'
import { IUnregisteredUser, IUser, IVKCodeData, IAllClimber } from './user.interfaces'
import { RequestState } from '../../types/request.types'

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
  addTeamToUser: () => void,
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      status: RequestState.PENDING,
      user: {
        grant: 1,
        allClimbId: null,
        team: [],
        friends: [{ allClimbId: 35292, name: 'Витя Кондрашин' }],
        pro: [],
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
                await get().changeState('error', 'ВК ошибка');
                return Promise.reject();
            }
          })
          .then(async(vkUser) => {
            await get().setVKUser(vkUser);
          });
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
                await get().changeState('error', 'ВК ошибка');
                return Promise.reject();
            }
          })
          .then(async(vkUser) => {
            await get().changeState('vkUser', vkUser);
          });
      },
    
      logoutVk: async() => {
        await get().changeState('vkUser', null);
        sessionStorage.clear();
        await get().changeState('status', RequestState.PENDING);
      },

      addTeamToUser: async () => {
        await set((state: UserState) => ({
          ...state,
          user: {
            ...state.user,
            team: TEAM as IAllClimber[],
          },
        }));
      },
    })
  )
)
