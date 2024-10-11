
import { useClimbersStore } from '../../climbers.store';
import AllClimbLink from '../AllClimbLink/AllClimbLink';
import { IAllClimber } from '../../../user/user.interfaces';
import { useUserStore } from '../../../user/user.store'

const ClimberInfo = () => {
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
    vkUser,
  } = useUserStore()
  const currentUser = vkUser || user;
  if (!currentUser) return
  const ids = currentUser ? [...currentUser.team, ...currentUser.friends].map(({ allClimbId }: IAllClimber) => allClimbId) : []
  const allClimbId = ids[climberPreviewId]
  if (!allClimbId) return
  const climber = climbers[allClimbId]
  if (!climber) return 'No data...'
  const { name, updatedAt } = climber
  
  return <div className="text-left">
    <div className="flex justify-between mb-4">
      <h2 className="font-bold">{name}</h2>
      <div>
        <AllClimbLink allClimbId={allClimbId} updatedAt={updatedAt} />
      </div>
    </div>
  </div>
}
  
export default ClimberInfo
