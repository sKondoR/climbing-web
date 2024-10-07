import { useNavigate } from 'react-router-dom';

import { useTeamStore } from '../../team.store'
import { useUserStore } from '../../../user/user.store'

const TeamMember = () => {
  const navigate = useNavigate();
  const {
    coaches,
    team,
    previewId,
  } = useTeamStore()

  const { addTeamToUser } = useUserStore()
  
  const onClick = () => {
    addTeamToUser()
     navigate('/allclimb')
  }
  
  const selected = [...coaches, ...team][previewId]
  return (
    <>
      <div onClick={onClick}>посмотреть результаты команды на AllClimb</div>
      {selected && (<h3>{selected.name}</h3>)}
    </>
  )
}
  
export default TeamMember
