import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import { copyLinkToClipboard } from '../../shareAllclimbGroups.utils';
import { useUserStore } from '../../../../6-entities/user/user.store';

const ShareAllclimbGroupsBtn: React.FC = () => {
  const { user } = useUserStore();
  
  const onClick = () => {
    copyLinkToClipboard(user.groups);
  };

  return (
    <div
        className="text-xl cursor-pointer text-blue-500 hover:text-orange-500" 
        onClick={onClick}
        title="поделиться ссылкой на группы скалолазов"
    >
        <FontAwesomeIcon
          icon={faShareNodes}
        />
    </div>
  )
}
  
export default ShareAllclimbGroupsBtn;
