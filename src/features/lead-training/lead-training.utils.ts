import moment from 'moment'

import { ILeadTraining, IScores } from './lead-training.interfaces'
import { DIFFICULTY } from '../../constants/routes.constants';

const dateToUnix = (date: string) => {
  const toDate = moment(date, 'DD-MM-YY').toDate();
  const toUnix = toDate.getTime();
  return toUnix;
};


export const calcScores = (c1: number, c2: number):IScores  => 
  DIFFICULTY.reduce((acc: IScores, cat, index) => {
    const score = parseFloat((c1 * Math.pow(index, 2)  + c2 * index  + 1).toFixed(2))
    acc[cat] = score
    return acc
  }, {})

export const formatData = (data: ILeadTraining[], scores: IScores, withStopsСoef: number, topRopeСoef: number) => {
  return data.map(({ routes = [], withStops = [], topRopes = [], date,  }) => {
    let value = 0;
    routes.forEach((r: string)  => value += scores[r])
    withStops.forEach((r: string)  => {
      let indexWS = DIFFICULTY.indexOf(r)
      if (indexWS - withStopsСoef >= 0) {
        indexWS = indexWS - withStopsСoef
      }
      value += scores[DIFFICULTY[indexWS]]
    })
    topRopes.forEach((r: string)  => value += topRopeСoef * scores[r])
    return {
      value,
      time: dateToUnix(date || '')
    };
  })
};

