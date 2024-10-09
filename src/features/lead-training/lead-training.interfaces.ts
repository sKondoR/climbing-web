export interface IFormattedDate {
  day: string;
  month: string;
  year: string;
}

export interface ILeadTrainingProps {
  routes: string[];
  day: string;
  month: string;
  year: string;
  userId: number | null | undefined,
}

export interface ILeadTraining {
  routes: string[];
  date: string;
  userId: number,
}