import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { filterByGrade } from '../../climbers.selectors'
import { IRoute } from '../../climbers.interfaces'
import { IAllClimber } from '../../../user/user.interfaces'
import AllClimbLink from '../AllClimbLink/AllClimbLink'

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  if (!user?.team) return
  const ids = user ? [...user.team, ...user.friends].map(({ allClimbId }: IAllClimber) => allClimbId) : [];
  const allClimbId = ids[climberPreviewId];
  if (!allClimbId) return;
  const climber = climbers[allClimbId];
  if (!climber) return 'No data...';
  const { name, updatedAt, leads, boulders } = climber;

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold">{name}</h2>
        <div>
          <AllClimbLink allClimbId={allClimbId} updatedAt={updatedAt} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div>
          <h4>Leads:</h4>
          {filterByGrade(leads)?.map((route: IRoute) => {
            return <div key={route.name}>{route.grade} - {route.name}</div>
          })}
        </div>
        <div>
          <h4>Boulders:</h4>
          {filterByGrade(boulders)?.map((route: IRoute) => {
            return <div key={route.name}>{route.grade} - {route.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}
  
export default ClimbersTabs
