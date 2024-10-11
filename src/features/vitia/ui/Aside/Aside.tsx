import { Sidebar } from 'flowbite-react'
import { PATHS } from '../../../../routes/paths'
const TeamTabs = () => {
  return <Sidebar className="w-full">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
            href={PATHS.competitions.to}
            key={PATHS.competitions.to}
            className="text-left px-0"
          >
            {PATHS.competitions.name}
        </Sidebar.Item>
        <Sidebar.Item
            href={PATHS.leadsHistory.to}
            key={PATHS.leadsHistory.to}
            className="text-left px-0"
          >
            {PATHS.leadsHistory.name}
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
}
  
export default TeamTabs
