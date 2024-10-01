import { createSelector } from 'reselect';
import { ClimbersState } from './climbers.store'
import {
    IRoute,
  } from './climbers.interfaces'

export const filterByGrade = (routes: IRoute[] | null) =>
    (routes || []).filter((route: { grade: string; }) => route.grade.startsWith('7') || route.grade.startsWith('8') || route.grade.startsWith('9'));

export const leadsSelector = createSelector(
  (state): ClimbersState => state.leads,
  (leads): IRoute[] => {
    return leads.filter(filterByGrade);
  }
);