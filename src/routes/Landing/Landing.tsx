import teamImg from '../../assets/team.jpg'
import TeamMember from '../../features/team/ui/TeamMember/TeamMember'
import TeamTabs from '../../features/team/ui/TeamTabs/TeamTabs'

const Landing = () => {
  return (
    <>
    <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
      <div className="pl-8 pt-8 pb-8"><TeamTabs /></div>
    </aside>
    <div className="relative h-full overflow-y-auto ml-96">
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="bg-white p-4"><TeamMember /></div>
        <div className="bg-white p-4"><img src={teamImg} /></div>
      </div>
    </div>
  </>
  )
}
  
export default Landing