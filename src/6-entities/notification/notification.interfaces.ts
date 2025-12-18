export type NotificationType = 'error' | 'warning' | 'success' | 'info';

export interface INotification {
    id?: string;
    type: NotificationType;
    message: string;
    code?: string;
    delay?: number;
};
