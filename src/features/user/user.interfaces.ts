export interface IUser {
    id: number;
    allClimbId: number | null;
    name: string | null;
    team: IAllClimber[];
    friends: IAllClimber[];
}

export interface IAllClimber {
    allClimbId: number | null;
    name: string | null;
}  
