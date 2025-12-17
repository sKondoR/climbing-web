import { useLayoutStore } from '../../../6-entities/layout/layout.store';

import AddUserGroup from '../../../5-features/editUserAllclimbers/ui/AddUserGroup/AddUserGroup';
import EditUserGroups from '../../../5-features/editUserAllclimbers/ui/EditUserGroups/EditUserGroups';
import SaveUserGroupsBtn from '../../../5-features/saveUserGroups/ui/SaveUserGroupsBtn/SaveUserGroupsBtn';
import UpdateAllClimbBtn from '../../../5-features/updateAllclimbers/ui/UpdateAllClimbBtn/UpdateAllClimbBtn';

const AllclimbEditClimber = () => {
  const {
    climberPreviewId,
    isUserEdit,
  } = useLayoutStore();

  return (<>
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
  </>)
}
  
export default AllclimbEditClimber;