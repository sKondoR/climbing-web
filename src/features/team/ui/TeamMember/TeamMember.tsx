import { useNavigate } from 'react-router-dom';

import { useTeamStore } from '../../team.store'
import { useUserStore } from '../../../user/user.store'
import TshirtImage from '../TshirtImage/TshirtImage'

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
      {selected && selected.isCityTeam ? (
        <div className="flex justify-between">
          {selected && (<h3>{selected.name}</h3>)}
          <TshirtImage name={selected.name}/>
        </div>
      ) : null}
    </>
  )
}
  
export default TeamMember
