import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { nanoid } from 'nanoid';

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
            groups: groups.map((group) => ({
              ...group,
              // toDo: поддерживать старые сохраненные группы без id, потом можно удалить
              id: group.id || nanoid()
            })),
        }));
      }
    })
  )
)

