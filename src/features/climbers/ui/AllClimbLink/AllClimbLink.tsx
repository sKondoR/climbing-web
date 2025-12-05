import { IAllClimbLink } from '../../climbers.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareUpRight } from '@fortawesome/free-solid-svg-icons'

const AllClimbLink = ({ allClimbId, updatedAt }:IAllClimbLink) => (
  <>
    <a
      href={`https://www.allclimb.com/ru/climber/${allClimbId}`}
      target="_blank"
      title={updatedAt ? `(обновленно: ${updatedAt})` : ''}
    >
      <FontAwesomeIcon icon={faSquareUpRight} /> AllClimb ({allClimbId})
    </a>
  </>
)
  
export default AllClimbLink
