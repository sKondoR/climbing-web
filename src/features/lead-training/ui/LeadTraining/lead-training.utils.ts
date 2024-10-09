import moment from 'moment'
import { ILeadTrainingProps } from '../../lead-training.interfaces'

const dateToUnix = (day: unknown, month: unknown, year: unknown) => {
  const toDate = moment(`${day}-${month}-${year}`, "DD-MM-YY").toDate();
  const toUnix = toDate.getTime();
  return toUnix;
};

export const formatData = (data: ILeadTrainingProps[]) =>
  data.map(({ routes, day, month, year }) => {
    return {
      value: routes,
      time: dateToUnix(day, month, year)
    };
  });