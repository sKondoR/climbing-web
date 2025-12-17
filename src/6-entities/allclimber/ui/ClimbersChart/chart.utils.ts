import { GRADES } from "../../../../7-shared/constants/routes.constants";
import { IChartSettings } from "../../../../7-shared/types/chart.types";
import { IClimbers } from "../../climbers.interfaces";

interface IChart {
    data: {
        name: string | null;
        [key: string]: string | number | null;
    }[];
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
    .map((id: number) => {
      const climber = climbers[id];
      let result: Record<string, number> = grades.reduce((acc: Record<string, number>, g: string) => {
        acc[g] = 0;
        return acc;
      }, {});
      climber?.[isLead ? 'leads' : 'boulders']
        .filter((r) => !isLead || (isTopRope || !r.isTopRope))
        .forEach((r) => {
          const key = r.grade.slice(0, 2);
          if (result[key] === maxRoutes) maxRoutes++;
          result = {
            ...result,
            [key]: result[key] + 1
          };
        })
      return {
        name: climber.name,
        ...result,
      };
    });

    return {
        data,
        maxRoutes,
    }
}

export const filterGrades = (settings: IChartSettings): string[] =>
  GRADES.filter((g) =>
    g.startsWith('6') && settings.is6 ||
    g.startsWith('7') && settings.is7 ||
    g.startsWith('8') && settings.is8)