export interface IUser {
    name: boolean;
    climberIds: number[];
}
  
export interface IClimber {
    id: number;
    allClimbId: string;
    name: string | null;
    leads: IRoute[];
    boulders: IRoute[];
    updatedAt: string | null;
}

export interface IRoute {
    isBoulder: boolean;
    grade: string;
    name: string;
    date: string;
}

export interface IClimbers {
    [U: string]: IClimber
}