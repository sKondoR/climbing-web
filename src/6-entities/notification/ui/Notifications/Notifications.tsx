import { Alert } from '@material-tailwind/react';
import { useNotificationsStore } from '../../notification.store';
import { INotification } from '../../notification.interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  const { notifications, removeNotification } = useNotificationsStore();

  return (
    <>
      {notifications.map((notification: INotification, index: number) => (
        <Alert
          key={notification.id}
          color={notification.type}
          className={`fixed bottom-3 mb-[${30+20*index}px] right-3 w-[300px] text-sm shadow-sm shadow-white text-left p-1`}
        >
          <Alert.Icon>
            <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-xl text-white hover:text-gray-800"
                aria-label="Удалить уведомление"
                title="Удалить уведомление"
                onClick={() => removeNotification(notification.id)}
            />
          </Alert.Icon>
          <Alert.Content>
            {notification.message}
          </Alert.Content>
        </Alert>
      ))}
    </>
  );
};

export default Notifications;
