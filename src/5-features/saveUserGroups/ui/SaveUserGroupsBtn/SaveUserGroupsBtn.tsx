import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
    <div
      onClick={onClick}
      title="сохранить и выйти"
      className="text-2xl cursor-pointer hover:text-orange-500"
    >
      <FontAwesomeIcon
        icon={faTimes}
        className="mt-1"
      />
    </div>
  )
}
  
export default SaveUserGroupsBtn;