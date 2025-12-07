
import { useMemo } from 'react';
import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import AllClimbLink from '../AllClimbLink/AllClimbLink';
import { useUserStore } from '../../../../6-entities/user/user.store';
import { getClimbersIds } from '../../../../6-entities/allclimber/climbers.utils';

const ClimberInfo = () => {
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
    vkUser,
  } = useUserStore()
  const currentUser = vkUser || user;
  if (!currentUser) return null;
  const ids = useMemo(() => getClimbersIds(currentUser), [currentUser]);
  const allClimbId = climberPreviewId != null ? ids[climberPreviewId] : undefined;
  if (!allClimbId) return null;
  const climber = climbers[allClimbId];
  if (!climber) return null;
  const { name, updatedAt } = climber;
  
  return <div className="flex items-center">
    <h2 className="text-3xl mr-3">{name}</h2>
    <div className="pt-2">
      <AllClimbLink allClimbId={allClimbId} updatedAt={updatedAt} />
    </div>
  </div>
}
  
export default ClimberInfo
