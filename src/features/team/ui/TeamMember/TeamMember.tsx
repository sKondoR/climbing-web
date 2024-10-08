import { useNavigate } from 'react-router-dom';

import { useTeamStore } from '../../team.store'
import { useUserStore } from '../../../user/user.store'
import TshirtImage from '../TshirtImage/TshirtImage'
import { getGroup } from '../../team.utils';

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
          <div>
            {selected && (<h3 className="font-bold">{selected.name}</h3>)}
            <div>{!selected.isCoach && getGroup(selected.year as string)}</div>
          </div>
          <div>
            <TshirtImage name={selected.name}/>
          </div>
        </div>
      ) : null}
    </>
  )
}
  
export default TeamMember
