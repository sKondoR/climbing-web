import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useLayoutStore } from '../../../6-entities/layout/layout.store';

import UpdateAllClimbBtn from '../../../5-features/updateAllclimbers/ui/UpdateAllClimbBtn/UpdateAllClimbBtn';
import ClimberInfo from '../../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo';
import ClimberPreview from '../../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview';

const AllclimbClimberPreview = () => {
  const {
    climberPreviewId,
    setClimberPreviewId,
    isUserEdit,
  } = useLayoutStore();

  return (<>
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
  </>)
}
  
export default AllclimbClimberPreview;