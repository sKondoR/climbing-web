import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { IAllClimber } from '../../../user/user.interfaces'

const UserIcon = () => {
  const { fetchClimbersAllClimb, climbers } = useClimbersStore()
  const { user } = useUserStore()

  if (!user?.team) return
  const ids = user ? [...user.team, ...user.friends].map(({ allClimbId }: IAllClimber) => allClimbId) : []
  const onClick = () => {
    if (ids.length) {
      fetchClimbersAllClimb(ids as number[], climbers)
    }
  }

  return (
    <button onClick={onClick} disabled={!ids.length}>Update climbers</button>
  )
}
  
export default UserIcon