
import { useMemo } from 'react';
import { useClimbersStore } from '../../climbers.store';
import AllClimbLink from '../AllClimbLink/AllClimbLink';
import { useUserStore } from '../../../user/user.store';
import { getClimbersIds } from '../../climbers.utils';
import { useLayoutStore } from '../../../layout/layout.store';

const ClimberInfo = () => {
  const {
    climbers,
  } = useClimbersStore();
  const {
    climberPreviewId,
  } = useLayoutStore();
  const {
    user,
  } = useUserStore();
  if (!user) return null;
  const ids = useMemo(() => getClimbersIds(user), [user]);
  const allClimbId = climberPreviewId != null ? ids[climberPreviewId] : undefined;
  if (!allClimbId) return null;
  const climber = climbers[allClimbId];
  if (!climber) return null;
  const { name, updatedAt } = climber;
  
  return <div className="flex items-center">
    <h2 className="text-2xl mr-3">{name}</h2>
    <div className="pt-2">
      <AllClimbLink allClimbId={allClimbId} updatedAt={updatedAt} />
    </div>
  </div>
}
  
export default ClimberInfo
