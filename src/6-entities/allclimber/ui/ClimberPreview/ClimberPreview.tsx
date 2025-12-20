import { useClimbersStore } from '../../climbers.store';
import { useUserStore } from '../../../user/user.store';
import { filterRoutes, getClimbersIds, getRouteKey } from '../../climbers.utils';
import { IRoute } from '../../climbers.interfaces';
import { IChartSettings } from '../../../../7-shared/types/chart.types';
import { GRADES_COLORS } from '../../../../7-shared/constants/routes.constants';
import { useLayoutStore } from '../../../layout/layout.store';

const ClimbersTabs = ({
  settings,
}: {
  settings: IChartSettings,
}) => {
  const {
    climbers,
  } = useClimbersStore();
  const {
    climberPreviewId,
  } = useLayoutStore();
  const {
    user,
  } = useUserStore()


  if (!user) return null;
  const ids = getClimbersIds(user);
  const allClimbId = climberPreviewId !== null ? ids[climberPreviewId] : undefined;
  if (!allClimbId) return null;
  const climber = climbers[allClimbId]
  if (!climber) return 'No data...'
  const { leads, boulders } = climber;

  const allRoutes = settings.isLead ? leads : boulders
  const routes = filterRoutes(allRoutes, settings);
  
  return (
    <>
      <div>
        <h2 className="font-bold">{`${settings.isLead ? 'Трудность' : 'Боулдеринг'} (${routes.length}/${allRoutes.length})`}</h2>
        {routes?.map((route: IRoute) => {
          const bg = GRADES_COLORS[route.grade.slice(0, 2)]
          return <div className="flex hover:bg-white/50 text-sm py-1" key={getRouteKey(route)}>
            <span className="w-2 mr-1" style={{ background: bg }}>&nbsp;</span>
            <span className="w-[55px] mr-1">{route.grade}</span>
            <div className="grow">{route.name} {route.isTopRope ? '(верхняя)' : ''}</div>
            <div className="grow text-right ml-2">{route.region}</div>
            <div className="text-right ml-5">{route.date}</div>
          </div>
        })}
      </div>
    </>
  )
}
  
export default ClimbersTabs;
