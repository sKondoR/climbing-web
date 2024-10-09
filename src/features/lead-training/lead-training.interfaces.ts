export interface ILeadTrainingProps {
  id: number | undefined;
  routes: string[];
  date: string;
  userId: number | null | undefined;
}

export interface ILeadTraining {
  id: number | undefined;
  routes: string[];
  date: string;
  userId: number;
}