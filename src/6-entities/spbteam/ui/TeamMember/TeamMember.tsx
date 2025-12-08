import { useTeamStore } from '../../../../6-entities/spbteam/spbteam.store';
import TshirtImage from '../../../../7-shared/ui/TshirtImage/TshirtImage';
import { getGroup } from '../../../../6-entities/spbteam/spbteam.utils';

const TeamMember = () => {
  const {
    coaches,
    team,
    previewId,
  } = useTeamStore();

  const selected = [...coaches, ...team][previewId];
  if (!selected?.year) return null;
  const group = getGroup(selected.year as string);
  return (
    <>
      {selected && selected.isCityTeam ? (
        <div className="flex justify-between">
          <div>
            {selected && (<h3 className="font-bold">{selected.name}</h3>)}
            <div>{!selected.isCoach && `${group.name} (${group.years})`}</div>
          </div>
          <div>
            <TshirtImage name={selected.name}/>
          </div>
        </div>
      ) : null}
    </>
  )
}
  
export default TeamMember;
