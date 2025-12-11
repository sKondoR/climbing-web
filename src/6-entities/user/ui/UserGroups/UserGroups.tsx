import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../../allclimber/climbers.store';
import { useUserStore } from '../../user.store';
import { ICustomAllClimber, IClimberGroup } from '../../user.interfaces';
import CollapsePanel from '../../../../7-shared/ui/CollapsePanel/CollapsePanel';
import { useLayoutStore } from '../../../layout/layout.store';


const UserGroups = () => {
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

  const onChange = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number): void => {
    e.stopPropagation()
    setPlotsVisibility({
      ...plotsVisibility,
      [id]: !plotsVisibility[id],
    })
  }

  const renderGroup = ({ name, items, offset = 0 }: IClimberGroup, index: number) => (
    <div key={`${name}-${index}`} className="pl-5 pr-5 pt-2 pb-2 bg-white/20 mb-[6px]">
    <CollapsePanel
      open
      label={`${name} (${items.length})`}
      key={name}
      className="mb-2"
    >
      {items.map(({ allClimbId, customName }: ICustomAllClimber, index: number) => {
        if (!allClimbId) return;
        const { routesCount, name } = climbers[allClimbId];
        const text = customName || name || allClimbId;        
        const currentIndex = offset + index;
        const isPlotVisible = plotsVisibility[allClimbId];
        return (
          <li className="flex" key={`${allClimbId}-${index}`}>
            <div className="grow flex items-center pr-2">
              <div className="w-7">
                <FontAwesomeIcon
                  icon={isPlotVisible ? faEye : faEyeSlash}
                  onClick={(e) => onChange(e, allClimbId)}
                  className={`cursor-pointer pt-2 ${isPlotVisible ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                />
              </div>
              <div className={
                  `grow py-1 px-2 font-normal group transition duration-75 text-left cursor-pointer ` +
                  `hover:bg-lime-500/20`
                }
                key={currentIndex}
                onClick={() => onActiveChange(currentIndex)}
              >
                <span className="flex-1 whitespace-nowrap pr-3">
                  {text}
                </span>
              </div>
            </div>
            <div className="w-[20%] px-2">
              {routesCount}
            </div>
            <div className="w-[20%] px-2">
              ...
            </div>
            <div className="w-7"></div>
          </li>
        );
      })}
    </CollapsePanel>
    </div>
  )

  let offset = 0;
  return <>
    {currentUser.groups.map((group: IClimberGroup, index: number) => {
      const cGroup = renderGroup({
        name: group.name,
        items: group.items as ICustomAllClimber[],
        offset,
      }, index);
      offset += group.items.length;
      return cGroup;
    })}
  </>
}
  
export default UserGroups;
