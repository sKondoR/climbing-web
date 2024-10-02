import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { filterByGrade } from '../../climbers.selectors'
import {
  IRoute,
} from '../../climbers.interfaces'

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  if (!user?.climberIds) return
  const climber = climbers[user.climberIds[climberPreviewId]];

  return (
    <div>
      <h2>{climber.name}</h2>
      <a href={`https://www.allclimb.com/ru/climber/${climber.allClimbId}`} target="_blank">go to AllClimb</a>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div>
          <h4>Leads:</h4>
          {filterByGrade(climber.leads)?.map((route: IRoute) => {
            return <div key={route.name}>{route.grade} - {route.name}</div>
          })}
        </div>
        <div>
          <h4>Boulders:</h4>
          {filterByGrade(climber.boulders)?.map((route: IRoute) => {
            return <div key={route.name}>{route.grade} - {route.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}
  
export default ClimbersTabs
