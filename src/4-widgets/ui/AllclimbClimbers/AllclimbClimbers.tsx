import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useClimbersStore } from '../../../6-entities/allclimber/climbers.store';
import EditUserAllClimbBtn from '../../../5-features/editUserAllclimbers/ui/EditUserAllClimbBtn/EditUserAllClimbBtn';
import UserGroups from '../../../6-entities/user/ui/UserGroups/UserGroups';

const AllclimbClimbers = () => {
  const {
    isFetchingAllClimb
  } = useClimbersStore();

  if (isFetchingAllClimb) {
    // return <CustomModal
    //   defaultOpen={true}
    //   title="test"
    // >
    //   <div className="flex px-10 py-10 justify-center">
    //     <div className="flex align-items"><Spinner className="mr-5 text-lg"/> Идет загрузка AllClimb скалолазов...</div>
    //   </div>
    // </CustomModal>
  }

  return (
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
  ) 
}
  
export default AllclimbClimbers;