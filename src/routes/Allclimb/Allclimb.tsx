import { useEffect } from 'react'
import ClimberInfo from '../../features/climbers/ui/ClimberInfo/ClimberInfo'
import ClimberPreview from '../../features/climbers/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../features/climbers/ui/ClimbersChart/ClimbersChart'
import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import { useUserStore } from '../../features/user/user.store'

const Team = () => {
  const { addTeamToUser } = useUserStore()
  
  useEffect(() => {
    addTeamToUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
      <div className="pl-8 pt-8 pb-8 h-full overflow-y-auto	overflow-x-hidden">
        <ClimbersTabs />
      </div>
    </aside>
    <div className="relative h-full overflow-y-auto ml-96">
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="bg-white p-4">
          <ClimberInfo />
          <ClimberPreview />
        </div>
        <div className="bg-white p-4">
          <h2 className="font-bold mb-4">Пролазы по категориям</h2>
          <ClimbersChart />
        </div>
      </div>
    </div>
  </>)
}
  
export default Team