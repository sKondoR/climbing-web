import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { Sidebar } from 'flowbite-react'
import { IAllClimber } from '../../../user/user.interfaces'

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

  if (!user?.team || !user.friends) return;

  const renderGroup = (name: string, items: IAllClimber[], offset: number = 0) => (
    <Sidebar.Collapse open label={name}>
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
        {renderGroup('Команда', user.team as IAllClimber[])}
        <hr />
        {renderGroup('Друзья', user.friends as IAllClimber[], user.team.length)}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default ClimbersTabs
