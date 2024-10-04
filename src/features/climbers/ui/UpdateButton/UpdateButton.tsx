import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { IAllClimber } from '../../../user/user.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

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
    <button
      className="bg-blue-600 text-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 p-3"
      onClick={onClick}
      disabled={!ids.length}
    ><FontAwesomeIcon icon={faArrowsRotate} /> AllClimb</button>
  )
}
  
export default UserIcon