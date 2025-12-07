import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { IAllClimber } from '../../../user/user.interfaces'

const UpdateButton = () => {
  const { fetchClimbersAllClimb, allClimbFetchStatus } = useClimbersStore()
  const { user, vkUser } = useUserStore();

  const isAllClimbFetching = !!allClimbFetchStatus;

  const currentUser = vkUser || user;
  if (!currentUser) return null;
  const ids = [
    ...currentUser.team,
    ...currentUser.friends,
    ...currentUser.pro,
  ].map(({ allClimbId }: IAllClimber) => allClimbId);
  if (!ids.length) return null;

  const onClick = () => {
      fetchClimbersAllClimb(ids as number[])
      // fetchClimbersAllClimb([37751] as number[])
  }
  return (
    <button
      type="button"
      className={`
        group relative rounded-none p-3 text-white flex items-center justify-center
        ${allClimbFetchStatus ? 'bg-lime-600' : 'bg-lime-500 hover:bg-lime-600'}
        overflow-hidden
        transition-colors
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
      {isAllClimbFetching ? `обновляю из AllClimb ${allClimbFetchStatus}...` : 'обновить из AllClimb'}
      {!isAllClimbFetching &&
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
      }
    </button>
  )
}
  
export default UpdateButton
