import moment from 'moment'

import { DIFFICULTY } from '../../lead-training.constants'
import { ILeadTraining } from '../../lead-training.interfaces'

const dateToUnix = (date: string) => {
  const toDate = moment(date, 'DD-MM-YY').toDate();
  const toUnix = toDate.getTime();
  return toUnix;
};

export const formatData = (data: ILeadTraining[]) =>
  data.map(({ routes, date }) => {
    return {
      value: calcScores(routes),
      time: dateToUnix(date || '')
    };
  });

// https://www.desmos.com/calculator/f0iqwia3zc?lang=ru
// scores = 0.1 * x^2 + 0.00644*x + 1
// so 6a(1score) and 8c+(30scores)
export const calcScores = (routes: string[]) => 
  routes.reduce((acc, r) => {
    acc = acc +  0.1 * Math.pow(DIFFICULTY.indexOf(r), 2) + 1
    return acc
  }, 0)
