import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  IClimberGroup,
} from '../../6-entities/user/user.interfaces';
import { useUserStore } from '../../6-entities/user/user.store';

export interface UserGroupsState {
  groups: IClimberGroup[],
  setUserGroups: (groups: IClimberGroup[]) => void;
  getGroupsFromUser: () => void;
}

export const useUserGroupsStore = create<UserGroupsState>()(
  devtools(
    (set) => ({
      groups: [],
      setUserGroups: (groups: IClimberGroup[]) => {
        set((state: UserGroupsState) => ({
            ...state,
            groups,
        }));
      },
      getGroupsFromUser: () => {
        const { groups } = useUserStore.getState().user;
        set((state: UserGroupsState) => ({
            ...state,
            groups,
        }));
      }
    })
  )
)

