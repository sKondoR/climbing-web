import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import { useLayoutStore } from '../../../../6-entities/layout/layout.store';

const UpdateAllClimbBtn: React.FC = () => {
  const { fetchClimbersAllclimb, allClimbFetchStatus, fetchNewClimbersAllclimb } = useClimbersStore();
  const { climberPreviewId } = useLayoutStore();

  const isAllClimbFetching = !!allClimbFetchStatus;
  const isUpdateSingleClimber = climberPreviewId || climberPreviewId === 0;

  const onClick = () => {
      fetchClimbersAllclimb();
  };

  const onOnlyNewClick = () => {
      fetchNewClimbersAllclimb();
  };

  return (
    <div className="flex flex-wrap bg-slate-500/70">
      <div className={`py-3 px-5 text-white ${isAllClimbFetching ? 'grow text-center' : ''}`}>
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className={`${isAllClimbFetching ? 'animate-[spin_1s_linear_infinite]' : ''} mr-2`}
        />
        {isAllClimbFetching ? `обновляю из AllClimb ${allClimbFetchStatus}...` : 'обновить из Allclimb'}
      </div>

      {!isAllClimbFetching ?
      <button
        type="button"
        className={`
          grow group relative rounded-none p-3 text-white flex items-center justify-center
          ${allClimbFetchStatus ? 'bg-slate-500' : 'bg-slate-500 hover:bg-slate-600'}
          overflow-hidden transition-colors
          disabled:opacity-70 disabled:cursor-not-allowed border-0 border-r-2 border-l-2 border-white/50
        `}
        onClick={onClick}
        disabled={isAllClimbFetching}
        aria-busy={isAllClimbFetching}
      >
        {isUpdateSingleClimber ? 'скалолаза' : 'всех'}
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button> : null}

      {!isUpdateSingleClimber && !isAllClimbFetching ?
      <button
        type="button"
        className={`
          grow group relative rounded-none p-3 text-white flex items-center justify-center
          ${allClimbFetchStatus ? 'bg-slate-500' : 'bg-slate-500 hover:bg-slate-600'}
          overflow-hidden transition-colors
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
        onClick={onOnlyNewClick}
        disabled={isAllClimbFetching}
        aria-busy={isAllClimbFetching}
      >
        только новых
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button> : null}
    </div>
  )
}
  
export default UpdateAllClimbBtn;
