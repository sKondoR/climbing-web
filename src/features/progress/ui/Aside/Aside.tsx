import { Sidebar } from 'flowbite-react'
import { PATHS } from '../../../../routes/paths'
const TeamTabs = () => {
  return <Sidebar className="w-full">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
            href={PATHS.lead.to}
            key={PATHS.lead.to}
            className="text-left px-0"
          >
            {PATHS.lead.name}
        </Sidebar.Item>
        <Sidebar.Item
            href={PATHS.competitions.to}
            key={PATHS.competitions.to}
            className="text-left px-0"
          >
            {PATHS.competitions.name}
        </Sidebar.Item>
        <Sidebar.Item
            href={PATHS.rocks.to}
            key={PATHS.rocks.to}
            className="text-left px-0"
          >
            {PATHS.rocks.name}
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default TeamTabs
