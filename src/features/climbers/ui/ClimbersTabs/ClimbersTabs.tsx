import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { Tabs } from 'flowbite-react';

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
    setClimberPreviewId,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  const onActiveTabChange = (tabIndex: number) => {
    setClimberPreviewId(tabIndex);
  }

  return (<Tabs variant="pills" onActiveTabChange={onActiveTabChange}>
    {user?.climberIds?.map((id, tabIndex) => {
      if (!climbers[id]) return;
      return <Tabs.Item
        active={tabIndex === climberPreviewId}
        title={`${climbers[id].name}`}
        key={id}
        className="text-sm p-0.5">
      </Tabs.Item>
    })}
  </Tabs>)
}
  
export default ClimbersTabs
