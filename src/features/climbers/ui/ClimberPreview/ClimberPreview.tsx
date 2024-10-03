import { useState } from 'react'
import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { filterByGrade } from '../../climbers.selectors'
import { IRoute, IChartSettings } from '../../climbers.interfaces'
import { IAllClimber } from '../../../user/user.interfaces'
import AllClimbLink from '../AllClimbLink/AllClimbLink'
import RoutesFilter from '../RoutesFilter/RoutesFilter'

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()
  const [settings, setSettings] = useState({
    isLead: true,
    isTopRope: true,
    is6: false,
    is7: true,
    is8: true,
  })

  if (!user?.team) return
  const ids = user ? [...user.team, ...user.friends].map(({ allClimbId }: IAllClimber) => allClimbId) : [];
  const allClimbId = ids[climberPreviewId];
  if (!allClimbId) return;
  const climber = climbers[allClimbId];
  if (!climber) return 'No data...';
  const { name, updatedAt, leads, boulders } = climber;

  const onSettingsChange = (newSettings: IChartSettings) => setSettings(newSettings)

  const routes = settings.isLead ? leads : boulders;
  return (
    <>
      <RoutesFilter settings={settings} onSettingsChange={onSettingsChange} />
      <div className="flex justify-between">
        <h2 className="font-bold">{name}</h2>
        <div>
          <AllClimbLink allClimbId={allClimbId} updatedAt={updatedAt} />
        </div>
      </div>
      <div>
        <h2 className="font-bold">{`${settings.isLead ? 'Трудность' : 'Боулдеринг'} (${routes.length})`}</h2>
        {filterByGrade(routes)?.map((route: IRoute) => {
          return <div key={route.name}>{route.grade} - {route.name} {route.isTopRope ? '(верхняя)' : ''}</div>
        })}
      </div>
    </>
  )
}
  
export default ClimbersTabs
