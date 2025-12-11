import { Sidebar } from 'flowbite-react';

import { useTeamStore } from '../../../../6-entities/spbteam/spbteam.store';
import { ITeamGroup, ITeamMember } from '../../../../6-entities/spbteam/spbteam.interfaces';
import TshirtIcon from '../../../../7-shared/assets/icons/TshirtIcon';

const TeamTabs = () => {
  const {
    coaches,
    team,
    previewId,
    setPreviewId,
  } = useTeamStore();

  const onActiveChange = (tabIndex: number) => {
    setPreviewId(tabIndex);
  }

  const renderGroup = ({ name, items, offset = 0 }: ITeamGroup) => (
    <Sidebar.Collapse
      open
      label={`${name} (${items.length})`}
    >
      {items.map(({ name, isCityTeam }: ITeamMember, index: number) => {
        const currentIndex = offset + index;
        return (
          <Sidebar.Item
            href="#"
            key={currentIndex}
            active={currentIndex === previewId}
            className="text-left px-0"
            onClick={() => onActiveChange(currentIndex)}
          >
            <span className="inline-block w-8 text-center">
              {isCityTeam && <TshirtIcon />}
            </span>
            {name}
          </Sidebar.Item>
        );
      })}
    </Sidebar.Collapse>
  )

  return <Sidebar className="w-full">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        {renderGroup({
          name: 'Тренеры',
          items: coaches as ITeamMember[],
          offset: 0,
        })}
        <hr />
        {renderGroup({
          name: 'Команда',
          items: team as ITeamMember[],
          offset: coaches.length,
        })}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default TeamTabs;
