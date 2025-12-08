import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ClimberInfo from '../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo'
import ClimberPreview from '../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../6-entities/allclimber/ui/ClimbersChart/ClimbersChart'
import ClimbersTabs from '../../6-entities/allclimber/ui/ClimbersTabs/ClimbersTabs'
import { useUserStore } from '../../6-entities/user/user.store'
import UpdateButton from '../../5-features/updateAllclimbers/ui/UpdateButton/UpdateButton';
import { PATHS } from '../../7-shared/constants/paths.constants';
import { useClimbersStore } from '../../6-entities/allclimber/climbers.store';

const Allclimb = () => {
  const { pathname } = useLocation();
  const { addTeamToUser } = useUserStore();
  const {
    climberPreviewId,
    setClimberPreviewId,
  } = useClimbersStore();
  
  // import.meta.env.DEV && 
  const isUpdateButtonVisible = pathname === `/${PATHS.allclimb.to}`;
  
  useEffect(() => {
    // for tests
    addTeamToUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <aside className="fixed w-[700px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px] duration-75 transition-width">  
      {climberPreviewId === null &&
        <>
          <h2 className="text-3xl mt-3 ml-5 mr-5">скалолазы AllClimb</h2>
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
            {climberPreviewId !== null && <div onClick={() => setClimberPreviewId(null)} className="text-2xl pt-1 text-black cursor-pointer hover:text-orange-500">
              <FontAwesomeIcon
                icon={faTimes}
                className="mt-1"
              />
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
  
export default Allclimb;