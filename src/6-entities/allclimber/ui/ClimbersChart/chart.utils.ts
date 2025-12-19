import { GRADES } from "../../../../7-shared/constants/routes.constants";
import { IChartSettings } from "../../../../7-shared/types/chart.types";
import { IClimbers } from "../../climbers.interfaces";

interface IChartDataItem {
  name: string;
  [key: string]: number | string;
}

interface IChart {
  data: IChartDataItem[];
  maxRoutes: number;
}

export const prepareChartData = (
    ids: number[],
    climbers: IClimbers,
    grades: string[],
    isLead: boolean,
    isTopRope: boolean
) : IChart => {
  let maxRoutes = 0;
  const data = ids?.filter((id: number) => !!climbers[id])
    // не показывать если нет данных
    .filter((id: number) => {
      const climber = climbers[id];
      return climber?.[isLead ? 'leads' : 'boulders'].length > 0;
    })
    // раскладывает данные по категориям
    .reduce((acc: IChartDataItem[], id: number) => {
      const climber = climbers[id];
      const routes = climber?.[isLead ? 'leads' : 'boulders'] || [];
      let result: Record<string, number> = {};

      routes
        .filter((r) => !isLead || (isTopRope || !r.isTopRope))
        .forEach((r) => {
          const key = r.grade.slice(0, 2);
          if (!grades.includes(key)) return;
          result[key] = (result[key] || 0) + 1;
          if (result[key] > maxRoutes) maxRoutes = result[key];
        });

      if(Object.keys(result).length > 0) {
        acc.push({
          name: climber?.name ?? '',
          ...result,
        }); 
      }
      return acc;
    }, []);

    return { data, maxRoutes };
}

export const filterGrades = (settings: IChartSettings): string[] =>
  GRADES.filter((g) =>
    g.startsWith('5') && settings.is5 ||
    g.startsWith('6') && settings.is6 ||
    g.startsWith('7') && settings.is7 ||
    g.startsWith('8') && settings.is8 ||
    g.startsWith('9') && settings.is9)