import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ClimberInfo from '../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo'
import ClimberPreview from '../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../6-entities/allclimber/ui/ClimbersChart/ClimbersChart'
import ClimbersTabs from '../../6-entities/allclimber/ui/ClimbersTabs/ClimbersTabs'
import { useUserStore } from '../../6-entities/user/user.store'
import UpdateAllClimbButton from '../../5-features/updateAllclimbers/ui/UpdateAllClimbButton/UpdateAllClimbButton';
import { useLayoutStore } from '../../6-entities/layout/layout.store';
import EditUserAllClimbButton from '../../5-features/editUserAllclimbers/ui/EditUserAllClimbButton';

import bg1 from '../../7-shared/assets/images/bg1.jpg';

const Allclimb = () => {
  const { addDefaultGroupsToUser } = useUserStore();
  const {
    climberPreviewId,
    setClimberPreviewId,
    isUserEdit,
    setIsUserEdit,
  } = useLayoutStore();
  
  // import.meta.env.DEV && 

  useEffect(() => {
    // for tests
    addDefaultGroupsToUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDefaultGroupsToUser]);

  return (<>
    <aside className="fixed w-[700px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px]
        duration-75 transition-width bg-slate-300"
          style={{
        backgroundImage: `url("${bg1}")`,
      }}
    >
    <div className={`flex flex-col flex-shrink-0 h-full ${climberPreviewId === null && !isUserEdit ? 'text-gray-200 bg-slate-700/80' : 'text-gray-800 bg-lime-500/90'} backdrop-blur-[2px]`}>
      {climberPreviewId === null && !isUserEdit &&
        <>
          <div className="flex justify-between pt-3 pl-5 pr-5">
            <h2 className="text-2xl mr-5">скалолазы AllClimb</h2>
            <EditUserAllClimbButton />
          </div>  
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-3 pb-3 pl-5 pr-5">
            <ClimbersTabs />
          </div>
        </>
      }
      {isUserEdit &&
        <>
          <div className="flex justify-between pt-3 pl-5 pr-5">
            <h2 className="text-2xl mr-5">редактировать</h2>
            <div onClick={() => setIsUserEdit(false)} className="text-2xl cursor-pointer hover:text-orange-500">
              <FontAwesomeIcon
                icon={faTimes}
                className="mt-1"
              />
            </div>
          </div> 
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-3 pb-3 pl-5 pr-5">
            ...
          </div>
          {(climberPreviewId !== null || isUserEdit) && <UpdateAllClimbButton />}
        </>
      }
      {climberPreviewId !== null && !isUserEdit &&
        <>
          <div className="flex justify-between pt-3 pl-5 pr-5">
            <ClimberInfo />
            {climberPreviewId !== null && <div onClick={() => setClimberPreviewId(null)} className="text-2xl cursor-pointer hover:text-orange-500">
              <FontAwesomeIcon
                icon={faTimes}
                className="mt-1"
              />
            </div>}
          </div> 
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-3 pb-3 pl-5 pr-5">     
            <ClimberPreview />
          </div>
          {(climberPreviewId !== null || isUserEdit) && <UpdateAllClimbButton />}
        </>
      }    
      </div>
    </aside>
    <div className="relative h-full overflow-y-auto ml-[700px]">
      <div className="bg-white pt-3 pb-3 pl-5 pr-5">
        <h2 className="text-2xl mb-2">пролазы по категориям</h2>
        <ClimbersChart />
      </div>
    </div>
  </>)
}
  
export default Allclimb;