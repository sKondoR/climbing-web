import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'

const UserIcon = () => {
  const { fetchClimbersAllClimb } = useClimbersStore()
  const { user } = useUserStore()

  const onClick = () => {
    if (user?.climberIds?.length) {
      fetchClimbersAllClimb(user?.climberIds)
    }
  }

  return (
    <button onClick={onClick} disabled={!user?.climberIds?.length}>Update climbers</button>
  )
}
  
export default UserIcon