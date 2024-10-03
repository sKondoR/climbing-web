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
      });
