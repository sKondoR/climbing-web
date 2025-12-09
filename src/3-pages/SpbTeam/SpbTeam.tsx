import teamImg from '../../7-shared/assets/images/team.jpg'
import bgImg from '../../7-shared/assets/images/bg1.jpg'
import TeamMember from '../../6-entities/spbteam/ui/TeamMember/TeamMember'
import TeamTabs from '../../6-entities/spbteam/ui/TeamTabs/TeamTabs'

const SpbTeam = () => {
  return (
    <>
      <div
        className="mx-auto h-80 max-w-lg overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url("${bgImg}")`
        }}
      >
      </div>
      <div>
        <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
          <div className="pl-8 pt-8 pb-8 h-full overflow-y-auto	overflow-x-hidden">
            <TeamTabs />
          </div>
        </aside>
        <div className="relative h-full overflow-y-auto ml-96">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white pt-3 pb-3 pl-5 pr-5"><TeamMember /></div>
            <div className="bg-white pt-3 pb-3 pl-5 pr-5"><img src={teamImg} /></div>
          </div>
        </div>
      </div>
    </>
  )
}
  
export default SpbTeam;