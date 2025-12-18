import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../../../6-entities/user/user.store';
import { useLayoutStore } from '../../../../6-entities/layout/layout.store';

const SaveUserGroupsBtn = () => {
  const { user, saveUserGroups, saveToUser } = useUserStore();
  const { setIsUserEdit } = useLayoutStore();

  const onSaveClick = (): void => {
    saveToUser();
    setIsUserEdit(false);
  };
  const onExitClick = (): void => {
    saveUserGroups();
    setIsUserEdit(false);
  };

  return (
    <>
      {'vk_id' in user ? (
        <div
          onClick={onSaveClick}
          title="сохранить в базу"
          className="text-xl cursor-pointer hover:text-orange-500 mr-3"
        >
          <FontAwesomeIcon
            icon={faSave}
            className="mt-[7px]"
          />
        </div>
      ) : null}
      <div
        onClick={onExitClick}
        title="сохранить локально"
        className="text-2xl cursor-pointer hover:text-orange-500"
      >
        <FontAwesomeIcon
          icon={faTimes}
          className=""
        />
      </div>
    </>
  )
}
  
export default SaveUserGroupsBtn;