import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { Tabs } from 'flowbite-react';
import {
  IRoute,
} from '../../climbers.interfaces'

const ClimbersTabs = () => {
  const {
    climbers,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  return (<Tabs variant="underline">
    {user?.climberIds?.map((id) => {
      if (!climbers[id]) return;
      return <Tabs.Item active title={`${climbers[id].name}:${climbers[id].allClimbId}`} key={id}>
        <div className="flex justify-start text-left">
          <div>
            <h4>Leads:</h4>
            {climbers[id].leads?.map((route: IRoute) => {
              return <div key={route.name}>{route.grade} - {route.name}</div>
            })}
          </div>
          <div>
            <h4>Boulders:</h4>
            {climbers[id].boulders?.map((route: IRoute) => {
              return <div key={route.name}>{route.grade} - {route.name}</div>
            })}
          </div>
        </div>
      </Tabs.Item>
    })}
  </Tabs>)
}
  
export default ClimbersTabs
