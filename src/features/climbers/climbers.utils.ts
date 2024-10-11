import { IAllClimber, IUnregisteredUser } from '../user/user.interfaces';
import { IRoute, IChartSettings } from './climbers.interfaces'

export const filterRoutes = (routes: IRoute[], settings: IChartSettings) =>
    (routes || [])
      .filter((route) => {
        const { grade, isTopRope } = route;
        return (
          (settings.is6 && grade.startsWith('6') ||
          settings.is7 && grade.startsWith('7') ||
          settings.is7 && grade.startsWith('8'))
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

export const getClimbersIds = (currentUser: IUnregisteredUser) => currentUser ? [...currentUser.team, ...currentUser.friends, ...currentUser.pro].map(({ allClimbId }: IAllClimber) => allClimbId) : []