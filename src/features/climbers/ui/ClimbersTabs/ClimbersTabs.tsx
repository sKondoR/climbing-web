import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { Sidebar } from "flowbite-react";

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

  return <Sidebar className="w-full">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Collapse open label="Команда">
          {user?.climberIds?.map((id, index) => {
            if (!climbers[id]) return;
            return (
              <Sidebar.Item
                href="#"
                key={id}
                active={index === climberPreviewId}
                className="text-left"
                onClick={() => onActiveChange(index)}
              >
                {climbers[id].name}
              </Sidebar.Item>
            );
          })}
        </Sidebar.Collapse>
        <hr />
        <Sidebar.Collapse open label="Друзья">
          ...
        </Sidebar.Collapse>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default ClimbersTabs
