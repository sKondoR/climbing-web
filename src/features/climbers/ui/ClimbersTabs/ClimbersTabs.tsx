import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { Sidebar } from 'flowbite-react'
import { IClimberGroup } from '../../climbers.interfaces'
import { IAllClimber } from '../../../user/user.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faPeopleGroup, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons'

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
    setClimberPreviewId,
    plotsVisibility,
    setPlotsVisibility,
  } = useClimbersStore()
  const {
    vkUser,
    user,
  } = useUserStore()
  const currentUser = vkUser || user;  

  const onActiveChange = (tabIndex: number) => {
    setClimberPreviewId(tabIndex);
  }

  if (!currentUser) return;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
    e.stopPropagation()
    setPlotsVisibility({
      ...plotsVisibility,
      [id]: e.target.checked,
    })
  }

  const renderGroup = ({ label, icon, items, offset = 0 }: IClimberGroup) => (
    <Sidebar.Collapse
      open
      label={`${label} (${items.length})`}
      icon={() =><FontAwesomeIcon icon={icon} />}
      key={label}
    >
      {items.map(({ allClimbId, name }: IAllClimber, index: number) => {
        if (!allClimbId) return;
        const text = name || climbers[allClimbId]?.name || allClimbId;
        const currentIndex = offset + index;
        return (
          // <Sidebar.Item
          //   href=""
          //   key={currentIndex}
          //   active={currentIndex === climberPreviewId}
          //   className="text-left"
          //   onClick={() => onActiveChange(currentIndex)}
          // >
          //   {name}
          // </Sidebar.Item>
          <li className="" key={`${allClimbId}-${name}`}>
            <div
              aria-labelledby="flowbite-sidebar-item-:rf:"
              className={
                `flex items-center justify-center rounded-lg p-2 text-base font-normal group w-full pl-3 transition duration-75 text-left cursor-pointer ` +
                `${climberPreviewId === offset + index ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-900 bg-gray-100 hover:bg-gray-200'}`
              }
              key={currentIndex}
              // active={currentIndex === climberPreviewId}
              onClick={() => onActiveChange(currentIndex)}
            >
              <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:rf:" className="flex-1 whitespace-nowrap px-3">
              <input id={`isVisible${allClimbId}`} type="checkbox" checked={plotsVisibility[allClimbId]}
                onChange={(e) => onChange(e, allClimbId)}
                className="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
                {text}
              </span>
            </div>
          </li>
        );
      })}
    </Sidebar.Collapse>
  )

  return <Sidebar className="w-full">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        {renderGroup({
          label: 'Команда',
          icon: faPeopleGroup,
          items: currentUser.team as IAllClimber[],
          offset: 0,
        })}
        <hr />
        {renderGroup({
          label: 'Друзья',
          icon: faHandshakeAngle,
          items: currentUser.friends as IAllClimber[],
          offset: currentUser.team.length,
        })}
        <hr />
        {renderGroup({
          label: 'Про-скалолазы',
          icon: faMedal,
          items: currentUser.pro as IAllClimber[],
          offset: currentUser.team.length + currentUser.friends.length,
        })}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default ClimbersTabs
