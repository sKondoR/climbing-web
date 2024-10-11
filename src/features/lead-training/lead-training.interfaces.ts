export interface ILeadTraining {
  id: number | undefined;
  userId: number | undefined;
  date: string | null;
  routes: string[];
  withStops: string[];
  topRopes: string[];
}

export type IScores = {
  [key: string]: number;
};