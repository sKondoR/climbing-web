import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl, options } from '../../constants/api.constants'
import { IUser, IVKUser } from './user.interfaces'
import { RequestState } from '../../types/request.types'

interface UserState {
  status: string,
  user: IUser | null,
  vkUser: IVKUser | null,
  error: string | null,
  changeState: (property: string, value: string | null) => void,
  fetchUser: (id: number) => void,
  setVKUser: (user: IVKUser) => void,
  loginVk: (code: string) => Promise<void>,
  getVKProfile: () => Promise<void>,
  logoutVk: () => Promise<void>,
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      status: RequestState.PENDING,
      user: null,
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
        const user = await res.json();
        await get().changeState('user', user);
      },
      setVKUser: (vkUser: IVKUser) => {
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
      loginVk: async (code: string) => {
        await get().changeState('status', RequestState.LOADING);
        return fetch(`${import.meta.env.VITE_VK_APP_CLIENT_ID}/auth/login/vk`, {
          method: 'POST',
          body: JSON.stringify({ code }),
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
    
        return fetch(`${import.meta.env.VITE_VK_APP_CLIENT_ID}/users/profile`, {
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
    })
  )
)
