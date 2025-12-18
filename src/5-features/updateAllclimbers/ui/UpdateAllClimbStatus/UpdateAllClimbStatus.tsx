import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';

const UpdateAllClimbStatus: React.FC = () => {
  const { allClimbFetchStatus } = useClimbersStore();

  const isAllClimbFetching = !!allClimbFetchStatus;
  if (!isAllClimbFetching) {
    return null;
  }
  return (
    <div className="flex flex-wrap bg-slate-500/70">
      <div className="py-3 px-5 text-white grow text-center">
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="nimate-[spin_1s_linear_infinite] mr-2"
        />
        {`обновляю из AllClimb ${allClimbFetchStatus}...`}
      </div>
    </div>
  )
}
  
export default UpdateAllClimbStatus;
