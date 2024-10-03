import { IAllClimbLink } from '../../climbers.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareUpRight } from '@fortawesome/free-solid-svg-icons'

const AllClimbLink = ({ allClimbId, updatedAt }:IAllClimbLink) => (
  <>
    <a href={`https://www.allclimb.com/ru/climber/${allClimbId}`} target="_blank"><FontAwesomeIcon icon={faSquareUpRight} /> AllClimb</a>
    {updatedAt && <span className="ml-1">(обновленно: {updatedAt})</span>}
  </>
)
  
export default AllClimbLink
