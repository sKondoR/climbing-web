import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faPeopleGroup, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../climbers.store';
import { useUserStore } from '../../../user/user.store';
import { IClimberGroup } from '../../climbers.interfaces';
import { ICustomAllClimber } from '../../../user/user.interfaces';
import CollapsePanel from '../../../../7-shared/ui/CollapsePanel/CollapsePanel';
import { useLayoutStore } from '../../../layout/layout.store';

const ClimbersTabs = () => {
  const {
    climbers,
  } = useClimbersStore();
  const {
    climberPreviewId,
    setClimberPreviewId,
    plotsVisibility,
    setPlotsVisibility,
  } = useLayoutStore();

  const {
    vkUser,
    user,
  } = useUserStore();

  const currentUser = vkUser || user;  
  if (!currentUser) return null;

  const onActiveChange = (tabIndex: number) => {
    setClimberPreviewId(climberPreviewId === tabIndex ? null : tabIndex);
  };

  if (!currentUser) return;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
    e.stopPropagation()
    setPlotsVisibility({
      ...plotsVisibility,
      [id]: e.target.checked,
    })
  }

  const renderGroup = ({ label, icon, items, offset = 0 }: IClimberGroup) => (
    <CollapsePanel
      open
      label={`${label} (${items.length})`}
      icon={<FontAwesomeIcon className="mr-2 cursor-pointer" icon={icon} />}
      key={label}
      className="mb-2"
    >
      {items.map(({ allClimbId, customName }: ICustomAllClimber, index: number) => {
        if (!allClimbId) return;
        const text = customName || climbers[allClimbId]?.name || allClimbId;
        const currentIndex = offset + index;
        return (
          <li className="flex" key={`${allClimbId}-${text}`}>
            <input
              id={`isVisible${allClimbId}`}
              type="checkbox"
              checked={plotsVisibility[allClimbId]}
              onChange={(e) => onChange(e, allClimbId)}
              className="w-4 h-4 mr-2 mt-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div
              className={
                `flex items-center justify-center p-2 font-normal group w-full transition duration-75 text-left cursor-pointer ` +
                `hover:bg-gray-200/10`
              }
              key={currentIndex}
              onClick={() => onActiveChange(currentIndex)}
            >
              <span className="flex-1 whitespace-nowrap px-3">
                {text}
              </span>
            </div>
          </li>
        );
      })}
    </CollapsePanel>
  )

  return <>
    {renderGroup({
      label: 'Команда',
      icon: faPeopleGroup,
      items: currentUser.team as ICustomAllClimber[],
      offset: 0,
    })}
    {renderGroup({
      label: 'Друзья',
      icon: faHandshakeAngle,
      items: currentUser.friends as ICustomAllClimber[],
      offset: currentUser.team.length,
    })}
    {renderGroup({
      label: 'Про-скалолазы',
      icon: faMedal,
      items: currentUser.pro as ICustomAllClimber[],
      offset: currentUser.team.length + currentUser.friends.length,
    })}
  </>
}
  
export default ClimbersTabs
