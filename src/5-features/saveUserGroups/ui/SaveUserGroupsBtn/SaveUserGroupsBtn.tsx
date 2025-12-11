import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../../../6-entities/user/user.store';
import { useLayoutStore } from '../../../../6-entities/layout/layout.store';

const SaveUserGroupsBtn = () => {
  const { saveUserGroups } = useUserStore();
  const { setIsUserEdit } = useLayoutStore();

  const onClick = (): void => {
    saveUserGroups();
    setIsUserEdit(false);
  };

  return (
    <FontAwesomeIcon
        icon={faSave}
        className="cursor-pointer text-xl text-gray-800 hover:text-orange-500 mt-2 ml-5"
        onClick={onClick}
        aria-label="Сохранить группы"
        title="Сохранить группы"
    />
  )
}
  
export default SaveUserGroupsBtn;