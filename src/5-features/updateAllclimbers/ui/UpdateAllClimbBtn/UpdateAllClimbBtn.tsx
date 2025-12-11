import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import { useLayoutStore } from '../../../../6-entities/layout/layout.store';

const UpdateAllClimbBtn = () => {
  const { fetchClimbersAllClimb, allClimbFetchStatus } = useClimbersStore();
  const { climberPreviewId } = useLayoutStore();

  const isAllClimbFetching = !!allClimbFetchStatus;
  const isUpdateSingleClimber = climberPreviewId || climberPreviewId === 0;

  const onClick = () => {
      fetchClimbersAllClimb();
  };

  return (
    <button
      type="button"
      className={`
        group relative rounded-none p-3 text-white flex items-center justify-center
        ${allClimbFetchStatus ? 'bg-slate-500' : 'bg-slate-500 hover:bg-slate-600'}
        overflow-hidden transition-colors
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
      onClick={onClick}
      disabled={isAllClimbFetching}
      aria-busy={isAllClimbFetching}
    >
      <FontAwesomeIcon
        icon={faArrowsRotate}
        className={`${isAllClimbFetching ? 'animate-[spin_1s_linear_infinite]' : ''} mr-2`}
      />
      {isAllClimbFetching ?
        `обновляю из AllClimb ${allClimbFetchStatus}...` :
        `обновить ${isUpdateSingleClimber ? 'скалолаза' : 'все'} из AllClimb`
      }
      {!isAllClimbFetching &&
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
      }
    </button>
  )
}
  
export default UpdateAllClimbBtn;
