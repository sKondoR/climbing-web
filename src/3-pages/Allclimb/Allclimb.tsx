import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../7-shared/ui/CustomModal/CustomModal';

import ClimberInfo from '../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo';
import ClimberPreview from '../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview';
import ClimbersChart from '../../6-entities/allclimber/ui/ClimbersChart/ClimbersChart';
import UserGroups from '../../6-entities/user/ui/UserGroups/UserGroups';
import { useUserStore } from '../../6-entities/user/user.store';
import UpdateAllClimbBtn from '../../5-features/updateAllclimbers/ui/UpdateAllClimbBtn/UpdateAllClimbBtn';
import { useLayoutStore } from '../../6-entities/layout/layout.store';
import EditUserAllClimbBtn from '../../5-features/editUserAllclimbers/ui/EditUserAllClimbBtn/EditUserAllClimbBtn';

import bg1 from '../../7-shared/assets/images/bg1.jpg';
import EditUserGroups from '../../5-features/editUserAllclimbers/ui/EditUserGroups/EditUserGroups';
import AddUserGroup from '../../5-features/editUserAllclimbers/ui/AddUserGroup/AddUserGroup';
import { useClimbersStore } from '../../6-entities/allclimber/climbers.store';
import { Spinner } from '@material-tailwind/react/dist/components/spinner';
import SaveUserGroupsBtn from '../../5-features/saveUserGroups/ui/SaveUserGroupsBtn/SaveUserGroupsBtn';

const Allclimb = () => {
  const { addDefaultGroupsToUser } = useUserStore();
  const { isFetchingAllClimb } = useClimbersStore();
  const {
    climberPreviewId,
    setClimberPreviewId,
    isUserEdit,
  } = useLayoutStore();

  useEffect(() => {
    // for tests
    // addDefaultGroupsToUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDefaultGroupsToUser]);

  if (isFetchingAllClimb) {
    return <CustomModal
      defaultOpen={true}
      title="test"
    >
      <div className="flex px-10 py-10 justify-center">
        <div className="flex align-items"><Spinner className="mr-5 text-lg"/> Идет загрузка AllClimb скалолазов...</div>
      </div>
    </CustomModal>
  }

  // text-gray-200 bg-slate-700/80
  return (<>
    <aside className="fixed w-[700px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px]
        duration-75 transition-width bg-slate-300"
          style={{
        backgroundImage: `url("${bg1}")`,
      }}
    >
      <div className={`flex flex-col flex-shrink-0 h-full text-gray-800 ${climberPreviewId === null && !isUserEdit ? 'bg-lime-300/90' : 'bg-lime-300/90'} backdrop-blur-[2px]`}>
      {climberPreviewId === null && !isUserEdit &&
        <>
          <div className="flex pt-3 pb-3 pl-5 pr-5">
            <h2 className="grow text-2xl pr-2">скалолазы AllClimb</h2>
            <div className="w-[20%] px-2 pt-2">
              трасс
            </div>
            <div className="w-[20%] px-2 pt-2">
              баллы
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="mt-1 ml-2"
                title="баллы за 10 лучших трасс за год"
              />
            </div>
            <div className="w-7">
              <EditUserAllClimbBtn />
            </div>
          </div>  
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pb-3">
            <UserGroups />
          </div>
        </>
      }
      {isUserEdit &&
        <>
          <div className="flex justify-between pt-3 pl-5 pr-5">
            <h2 className="text-2xl mr-5">редактировать группы</h2>
            <div className="grow">
              <AddUserGroup />
            </div>
            <SaveUserGroupsBtn />
          </div> 
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-3 pb-3">
            <EditUserGroups />
          </div>
          {(climberPreviewId !== null || isUserEdit) && <UpdateAllClimbBtn />}
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
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-3 pb-3 pl-5 pr-3">     
            <ClimberPreview />
          </div>
          {(climberPreviewId !== null || isUserEdit) && <UpdateAllClimbBtn />}
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