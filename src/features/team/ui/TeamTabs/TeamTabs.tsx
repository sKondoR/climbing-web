import { useTeamStore } from '../../team.store'
import { Sidebar } from 'flowbite-react'
import { ITeamGroup, ITeamMember } from '../../team.interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

const TeamTabs = () => {
  const {
    coaches,
    team,
    previewId,
    setPreviewId,
  } = useTeamStore()

  const onActiveChange = (tabIndex: number) => {
    setPreviewId(tabIndex);
  }

  const renderGroup = ({ label, icon, items, offset = 0 }: ITeamGroup) => (
    <Sidebar.Collapse
      open
      label={`${label} (${items.length})`}
      icon={() =><FontAwesomeIcon icon={icon} />}
    >
      {items.map(({ name }: ITeamMember, index: number) => {
        const currentIndex = offset + index;
        return (
          <Sidebar.Item
            href="#"
            key={currentIndex}
            active={currentIndex === previewId}
            className="text-left"
            onClick={() => onActiveChange(currentIndex)}
          >
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
          label: 'Тренеры',
          icon: faStar,
          items: coaches as ITeamMember[],
          offset: 0,
        })}
        <hr />
        {renderGroup({
          label: 'Команда',
          icon: faPeopleGroup,
          items: team as ITeamMember[],
          offset: coaches.length,
        })}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default TeamTabs
