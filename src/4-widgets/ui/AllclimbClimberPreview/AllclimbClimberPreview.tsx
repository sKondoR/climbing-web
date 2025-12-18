import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import UpdateAllClimbStatus from '../../../5-features/updateAllclimbers/ui/UpdateAllClimbStatus/UpdateAllClimbStatus';
import { useLayoutStore } from '../../../6-entities/layout/layout.store';
import ClimberInfo from '../../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo';
import ClimberPreview from '../../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview';

const AllclimbClimberPreview = () => {
  const {
    climberPreviewId,
    setClimberPreviewId,
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
    <UpdateAllClimbStatus />
  </>)
}
  
export default AllclimbClimberPreview;