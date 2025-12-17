import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid'

import { useUserGroupsStore } from '../../userGroups.store';

const AddUserGroup = () => {
  const { groups, setUserGroups } = useUserGroupsStore();

  const setGroups = () => {
      setUserGroups([
        ...groups,
        {
          id: nanoid(),
          name: 'Новая группа',
          items: [],
        }
      ]);
  }

  return (
    <FontAwesomeIcon
        icon={faPlus}
        className="cursor-pointer text-xl text-gray-800 hover:text-orange-500 mt-2"
        onClick={() => setGroups()}
        aria-label="Добавить новую группу"
        title="Добавить новую группу"
    />
  )
}
  
export default AddUserGroup;