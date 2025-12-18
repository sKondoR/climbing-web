import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

import { useShareAllclimbGroupsStore } from '../../shareAllclimbGroups.store';
import { useUserStore } from '../../../../6-entities/user/user.store';
import useAnimate from '../../../../7-shared/hooks/useAnimate';

const ShareAllclimbGroupsBtn: React.FC = () => {
  const [isAnimating, setIsAnimating] = useAnimate(1000);

  const { user } = useUserStore();
  const { copyLinkToClipboard } = useShareAllclimbGroupsStore();

  const onClick = () => {
    setIsAnimating(true);
    copyLinkToClipboard(user.groups);
  };

  return (
    <div
        className={`text-xl cursor-pointer text-blue-500 hover:text-orange-500
          transition-all duration-300s
          ${isAnimating ? 'animate-ping scale-1' : ''}
        `} 
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
