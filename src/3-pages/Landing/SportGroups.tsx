import { useTeamStore } from "../../5-features/team/team.store";
import {
  ITeamMember,
} from '../../5-features/team/team.interfaces';
import { getGroup } from "../../5-features/team/team.utils";


interface IGroup {
  name: string;
  bg: string;
}

const GROUPS: IGroup[] = [{
  name: '10-13',
  bg: 'bg-amber-300'
}, {
  name: '14-15',
  bg: 'bg-orange-300'
},
{ 
  name: '16-17',
  bg: 'bg-lime-300'
},
{ 
  name: '18-19',
  bg: 'bg-indigo-300'
}];

const SportGroups = () => {
  const { team } = useTeamStore();

  const initialGroups: { [key: string]: ITeamMember[] } = GROUPS.reduce((acc, group) => {
    acc[group.name] = [];
    return acc;
  }, {} as { [key: string]: ITeamMember[] });

  const filteredTeam = team.reduce((acc, member: ITeamMember) => {
    const group = getGroup(member.year as string);
    if (acc[group.name]) {
      acc[group.name].push(member);
    }
    return acc;
  }, initialGroups);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {GROUPS.map((group) => (
        <div className="flex" key={group.name}>
          <div className={`${group.bg} p-6 shadow-md flex-1 relative`}>
            <div className="text-3xl mb-4 absolute top-[-27px] right-[25px] text-teal-900 font-bold text-5xl">{group.name}</div>
            {filteredTeam?.[group.name].map((member: ITeamMember) => (
              <div key={member.name}>{member.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportGroups;