import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import { copyLinkToClipboard } from '../../shareAllclimbGroups.utils';
import { useUserStore } from '../../../../6-entities/user/user.store';

const ShareAllclimbGroupsBtn: React.FC = () => {
  const { user } = useUserStore();

  const link = copyLinkToClipboard(user.groups);

  return (
    <a 
      href={link} target="_blank"
      className="text-xl cursor-pointer text-blue-500 hover:text-orange-500" 
      title="поделиться ссылкой на группы скалолазов"
    >
        <FontAwesomeIcon
          icon={faShareNodes}
        />
    </a>
  )
}
  
export default ShareAllclimbGroupsBtn;
