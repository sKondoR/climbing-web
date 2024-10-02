import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getApiUrl } from '../../constants/api.constants'
import { IUser } from './user.interfaces'

interface UserState {
  user: IUser | null,
  fetchUser: (id: number) => void,
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      fetchUser: async (id: number) => {
        const res = await fetch(`${getApiUrl()}/users/${id}`) 
        const user = await res.json();
        set((state: UserState) => ({
          ...state,
          user,
        }));
      },
    })
  )
)
