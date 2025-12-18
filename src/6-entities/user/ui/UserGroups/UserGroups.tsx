import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../../allclimber/climbers.store';
import { useUserStore } from '../../user.store';
import { ICustomAllClimber, IClimberGroup } from '../../user.interfaces';
import CollapsePanel from '../../../../7-shared/ui/CollapsePanel/CollapsePanel';
import { useLayoutStore } from '../../../layout/layout.store';

const UserGroups = () => {
  const [groupVisibility, setGroupVisibility] = useState<Record<string, boolean>>({});
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
    user,
  } = useUserStore();

  if (!user) return null;

  useEffect(() => {
    setGroupVisibility(
      user.groups.reduce((acc: { [x: string]: boolean; }, _group: IClimberGroup, index: number) => {
        acc[index] = true;
        return acc;
      }, {})
    );
  }, []);

  const onActiveChange = (tabIndex: number) => {
    setClimberPreviewId(climberPreviewId === tabIndex ? null : tabIndex);
  };

  const onChange = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number): void => {
    e.stopPropagation()
    setPlotsVisibility({
      ...plotsVisibility,
      [index]: !plotsVisibility[index],
    })
  }

  const handleGroupVisibilityClick = (index: number, e?: React.MouseEvent<SVGSVGElement>) => {
    e?.stopPropagation();
    const visibility = user.groups[index].items.reduce(
      (acc: { [x: string]: boolean; }, item: ICustomAllClimber) => {
      acc[item.allClimbId] = !groupVisibility[index];
      return acc;
    }, {});
    setPlotsVisibility({
      ...plotsVisibility,
      ...visibility
    });
    setGroupVisibility({
      ...groupVisibility,
      [index]: groupVisibility?.[index] ? false : true
    });
  }

  const renderGroup = ({ id, name, items, offset = 0 }: IClimberGroup, index: number) => (
    <div key={id || `${name}-${index}`} className="pl-5 pr-5 pt-2 pb-2 bg-white/40 mb-[6px]">
    <CollapsePanel
      open
      // label={`${name} (${items.length})`}
      label={<>
        <div className="inline-block w-7 text-sm">
          <FontAwesomeIcon
            icon={groupVisibility[index] ? faEye : faEyeSlash}
            onClick={(e) => handleGroupVisibilityClick(index, e)}
            className={`cursor-pointer pt-2 ${groupVisibility[index] ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
            title="показать/спрятать графики группы"
          />
        </div>
        {`${name} (${items.length})`}
      </>}
      key={name}
      className="mb-2"
    >
      {items?.map(({ allClimbId, customName }: ICustomAllClimber, index: number) => {
        if (!allClimbId) return;
        if (!(allClimbId && climbers?.[allClimbId])) return (
          <li className="flex py-1 text-sm hover:bg-lime-500/20" key={`${allClimbId}-${index}`}>
            allClimbId {allClimbId} не загружен в базу
          </li>
        );
        // toDo: добавить нотификацию
        const { name, routesCount, scores } = climbers[allClimbId];
        const text = customName || name || allClimbId;
        // toDo: использовать allclimbId вместо offset        
        const currentIndex = offset + index;
        const isPlotVisible = plotsVisibility[allClimbId];
        return (
          <li className="flex" key={`${allClimbId}-${index}`}>
            <div className="grow flex items-center pr-2">
              <div className="w-7 text-sm">
                <FontAwesomeIcon
                  icon={isPlotVisible ? faEye : faEyeSlash}
                  onClick={(e) => onChange(e, allClimbId)}
                  className={`cursor-pointer pt-2 ${isPlotVisible ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                  title="показать/спрятать графики скалолаза"
                />
              </div>
              <div className={
                  `grow py-1 px-2 font-normal group transition duration-75 text-left cursor-pointer ` +
                  `hover:bg-lime-500/20`
                }
                key={currentIndex}
                onClick={() => onActiveChange(currentIndex)}
              >
                <span className="flex-1 text-sm whitespace-nowrap pr-3">
                  {text}
                </span>
              </div>
            </div>
            <div className="w-[20%] py-1 px-2 text-sm">
              {routesCount}
            </div>
            <div className="w-[20%] py-1 px-2 text-sm">
              {scores}
            </div>
            <div className="w-5"></div>
          </li>
        );
      })}
    </CollapsePanel>
    </div>
  )

  let offset = 0;
  return <>
    {user.groups.map((group: IClimberGroup, index: number) => {
      const cGroup = renderGroup({
        id: group.id,
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
