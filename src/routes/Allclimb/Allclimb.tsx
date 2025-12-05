import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ClimberInfo from '../../features/climbers/ui/ClimberInfo/ClimberInfo'
import ClimberPreview from '../../features/climbers/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../features/climbers/ui/ClimbersChart/ClimbersChart'
import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import { useUserStore } from '../../features/user/user.store'
import UpdateButton from '../../features/climbers/ui/UpdateButton/UpdateButton';
import { PATHS } from '../paths';
import { useClimbersStore } from '../../features/climbers/climbers.store';

const Team = () => {
  const { pathname } = useLocation();
  const { addTeamToUser } = useUserStore()
  const {
    climberPreviewId,
    setClimberPreviewId,
  } = useClimbersStore()
  
  const isUpdateButtonVisible = import.meta.env.DEV && pathname === `/${PATHS.allclimb.to}`;
  
  useEffect(() => {
    addTeamToUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <aside className="fixed w-[700px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px] duration-75 transition-width">  
      {climberPreviewId === null &&
        <>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <ClimbersTabs />
          </div>
          {isUpdateButtonVisible && <UpdateButton />}
        </>
      }
      {climberPreviewId !== null &&
        <>
          <div className="flex justify-between pt-3 pb-3 pl-5 pr-5">
            <ClimberInfo />
            {climberPreviewId !== null && <div onClick={() => setClimberPreviewId(null)} className="pt-1 text-black cursor-pointer hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>}
          </div> 
          <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-slate-00 pt-3 pb-3 pl-5 pr-5">     
            <ClimberPreview />
          </div>
        </>
      }
    </aside>
    <div className="relative h-full overflow-y-auto ml-[700px]">
      <div className="bg-white pt-3 pb-3 pl-5 pr-5">
        <h2 className="text-3xl mb-2">пролазы по категориям</h2>
        <ClimbersChart />
      </div>
    </div>
  </>)
}
  
export default Team