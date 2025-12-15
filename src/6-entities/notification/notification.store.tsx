import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { INotification } from './notification.interfaces';
import { nanoid } from 'nanoid'

const NOTIFICATION_TIMEOUT = 1000000;

export interface NotificationsState {
  notifications: INotification[],
  addNotification: (notification: INotification) => void;
  removeNotification: (removeId: INotification['id']) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  devtools(
    (set) => ({
      notifications: [],
      addNotification: (notification: INotification) => {
        const id = nanoid();
        const notificationWithId = { ...notification, id };
        set((state: NotificationsState) => ({
            ...state,
            notifications: [
              ...state.notifications,
              notificationWithId
            ],
        }));
        setTimeout(() => {
          set((state: NotificationsState) => ({
            ...state,
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        }, NOTIFICATION_TIMEOUT);
      },
      removeNotification: (removeId: INotification['id']) => {
        set((state: NotificationsState) => ({
            ...state,
            notifications: state.notifications.filter(({ id }) => id !== removeId),
        }));
      },
    })
  )
)

