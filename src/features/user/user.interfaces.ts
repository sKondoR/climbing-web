export interface IUser {
    id: number;
    allClimbId: number | null;
    name: string | null;
    team: IAllClimber[];
    friends: IAllClimber[];
    pro: IAllClimber[];
}

export interface IAllClimber {
    allClimbId: number | null;
    name: string | null;
}  
