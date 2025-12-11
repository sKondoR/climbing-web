import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { useLayoutStore } from '../../../../6-entities/layout/layout.store';

const EditUserAllClimbBtn = () => {
  const { setIsUserEdit } = useLayoutStore();
  
  const onClick = () => {
    setIsUserEdit(true);
  };

  return (
    <FontAwesomeIcon
      icon={faCog}
      className="text-2xl pt-1 cursor-pointer hover:text-orange-500"
      onClick={onClick}
    />
  )
}
  
export default EditUserAllClimbBtn;