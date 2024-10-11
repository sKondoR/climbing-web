import { useTeamStore } from '../../team.store'
import TshirtImage from '../TshirtImage/TshirtImage'
import { getGroup } from '../../team.utils';

const TeamMember = () => {
  const {
    coaches,
    team,
    previewId,
  } = useTeamStore()

  const selected = [...coaches, ...team][previewId]
  return (
    <>
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
