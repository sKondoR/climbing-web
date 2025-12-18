import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import EditUserAllClimbBtn from '../../../5-features/editUserAllclimbers/ui/EditUserAllClimbBtn/EditUserAllClimbBtn';
import { ShareAllclimbGroupsBtn } from '../../../5-features/shareAllclimbGroups/ui/ShareAllclimbGroupsBtn';
import UpdateAllClimbStatus from '../../../5-features/updateAllclimbers/ui/UpdateAllClimbStatus/UpdateAllClimbStatus';
import UserGroups from '../../../6-entities/user/ui/UserGroups/UserGroups';
import { useClimbersStore } from '../../../6-entities/allclimber/climbers.store';
import { Loading } from '../../../7-shared/ui/Loading';


const AllclimbClimbers = () => {
  const {
    isFetchingAllClimb
  } = useClimbersStore();

  return (
      <>
        <div className="flex pt-3 pb-3 pl-5 pr-5">
          <h2 className="text-2xl pr-2">скалолазы AllClimb</h2>
          {isFetchingAllClimb ? null : <>
            <div className="grow px-2 pt-1">
              <ShareAllclimbGroupsBtn />
            </div>
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
            <div className="w-5">
              <EditUserAllClimbBtn />
            </div>
          </>}
        </div>  
        <div className="w-full h-full overflow-y-auto overflow-x-hidden pb-3">
          {isFetchingAllClimb ?
            <div className="px-5"><Loading text="загрузка AllClimb скалолазов..." /></div>
            : <UserGroups />
          }          
        </div>
        <UpdateAllClimbStatus />
      </>
  ) 
}
  
export default AllclimbClimbers;