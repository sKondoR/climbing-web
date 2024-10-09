import moment from 'moment'
import { ITrainingDay } from '../../lead-training.interfaces'

const dateToUnix = (day: unknown, month: unknown, year: unknown) => {
  const toDate = moment(`${day}-${month}-${year}`, "DD-MM-YY").toDate();
  const toUnix = toDate.getTime();
  return toUnix;
};

export const formatData = (data: ITrainingDay[]) =>
  data.map(({ routes, day, month, year }) => {
    return {
      value: routes,
      time: dateToUnix(day, month, year)
    };
  });