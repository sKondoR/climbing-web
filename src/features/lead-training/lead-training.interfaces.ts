export interface ILeadTraining {
  id: number | undefined;
  routes: string[];
  date: string | null;
  userId: number | undefined;
}

export type IScores = {
  [key: string]: number;
};