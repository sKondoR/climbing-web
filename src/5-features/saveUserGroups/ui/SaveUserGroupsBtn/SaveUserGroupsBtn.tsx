import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../../../6-entities/user/user.store';


const SaveUserGroupsBtn = () => {
  const { saveUserGroups } = useUserStore();

  return (
    <FontAwesomeIcon
        icon={faSave}
        className="cursor-pointer text-xl text-gray-800 hover:text-orange-500 mt-2"
        onClick={() => saveUserGroups()}
        aria-label="Сохранить группы"
        title="Сохранить группы"
    />
  )
}
  
export default SaveUserGroupsBtn;