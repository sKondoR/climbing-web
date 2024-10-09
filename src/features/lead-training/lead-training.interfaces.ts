export interface IFormattedDate {
  day: string;
  month: string;
  year: string;
}

export interface ITrainingDay {
  routes: string[];
  day: string;
  month: string;
  year: string;
  userId: number | null | undefined,
}

export interface ITrainingRequest {
  routes: string[];
  date: string;
  userId: number,
}