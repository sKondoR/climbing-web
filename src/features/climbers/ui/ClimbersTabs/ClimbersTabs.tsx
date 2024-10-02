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
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  const onActiveChange = (tabIndex: number) => {
    setClimberPreviewId(tabIndex);
  }

  if (!user?.team || !user.friends || !user.pro) return;

  const renderGroup = ({ label, icon, items, offset = 0 }: IClimberGroup) => (
    <Sidebar.Collapse
      open
      label={`${label} (${items.length})`}
      icon={() =><FontAwesomeIcon icon={icon} />}
    >
      {items.map(({ allClimbId, name }: IAllClimber, index: number) => {
        if (!allClimbId || !climbers[allClimbId]) return;
        const currentIndex = offset + index;
        return (
          <Sidebar.Item
            href="#"
            key={currentIndex}
            active={currentIndex === climberPreviewId}
            className="text-left"
            onClick={() => onActiveChange(currentIndex)}
          >
            {name}
          </Sidebar.Item>
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
          items: user.team as IAllClimber[],
          offset: 0,
        })}
        <hr />
        {renderGroup({
          label: 'Друзья',
          icon: faHandshakeAngle,
          items: user.friends as IAllClimber[],
          offset: user.team.length,
        })}
        <hr />
        {renderGroup({
          label: 'Про-скалолазы',
          icon: faMedal,
          items: user.pro as IAllClimber[],
          offset: user.team.length + user.friends.length,
        })}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default ClimbersTabs
