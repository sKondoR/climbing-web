import { ICustomAllClimber, IUnregisteredUser, IClimberGroup } from '../user/user.interfaces';
import { IRoute } from './climbers.interfaces';
import { IChartSettings } from '../../7-shared/types/chart.types';

export const filterRoutes = (routes: IRoute[], settings: IChartSettings) =>
    (routes || [])
      .filter((route) => {
        const { grade, isTopRope } = route;
        return (
          (settings.is6 && grade.startsWith('6') ||
          settings.is7 && grade.startsWith('7') ||
          settings.is8 && grade.startsWith('8'))
          && (!settings.isLead || (settings.isTopRope || !isTopRope))
        )
      })
      .sort((a, b) => {
        if (!settings.sortByCategory) return 0;
        if ( a.grade < b.grade ){
          return 1;
        }
        if ( a.grade > b.grade ){
          return -1;
        }
        return 0;
      });
      
export const getRouteKey = (route: IRoute): string =>
  `${route.name}${route.grade}${route.region}`;

export const getClimbersIds = (currentUser: IUnregisteredUser): number[] =>
  currentUser?.groups?.flatMap(
    (group: IClimberGroup) => group.items.map((climber: ICustomAllClimber) => climber.allClimbId)
  ) || [];

