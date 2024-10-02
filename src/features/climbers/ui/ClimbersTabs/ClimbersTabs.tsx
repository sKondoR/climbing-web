import { useClimbersStore } from '../../climbers.store'
import { filterByGrade } from '../../climbers.selectors'
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

  return (<Tabs variant="pills">
    {user?.climberIds?.map((id) => {
      if (!climbers[id]) return;
      return <Tabs.Item active title={`${climbers[id].name}`} key={id} className="text-sm">
        <h2>{climbers[id].name}</h2>
        <a href={`https://www.allclimb.com/ru/climber/${climbers[id].allClimbId}`} target="_blank">go to AllClimb</a>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <h4>Leads:</h4>
            {filterByGrade(climbers[id].leads)?.map((route: IRoute) => {
              return <div key={route.name}>{route.grade} - {route.name}</div>
            })}
          </div>
          <div>
            <h4>Boulders:</h4>
            {filterByGrade(climbers[id].boulders)?.map((route: IRoute) => {
              return <div key={route.name}>{route.grade} - {route.name}</div>
            })}
          </div>
        </div>
      </Tabs.Item>
    })}
  </Tabs>)
}
  
export default ClimbersTabs
