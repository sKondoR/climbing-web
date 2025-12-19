import { IAllClimbLink } from '../../climbers.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareUpRight } from '@fortawesome/free-solid-svg-icons'
import { ALLCLIMB_URL } from '../../../../7-shared/constants/api.constants'

const AllClimbLink = ({ allClimbId, updatedAt }:IAllClimbLink) => (
  <>
    <a
      href={`${ALLCLIMB_URL}/climber/${allClimbId}`}
      target="_blank"
      title={updatedAt ? `(обновленно: ${updatedAt})` : ''}
      className="text-blue-500 hover:text-orange-500"
    >
      <FontAwesomeIcon icon={faSquareUpRight} /> AllClimb ({allClimbId})
    </a>
  </>
)
  
export default AllClimbLink
