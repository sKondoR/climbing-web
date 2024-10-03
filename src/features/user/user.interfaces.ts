export interface IUser {
    id: number;
    allClimbId: number | null;
    name: string | null;
    team: IAllClimber[];
    friends: IAllClimber[];
    pro: IAllClimber[];
    token: string | null;
}

export interface IVKUser {
    id: number;
    email: string;
    grant: number;
    name: string;
    token: string;
    avatar_url: string | null;
}

export interface IAllClimber {
    allClimbId: number | null;
    name: string | null;
}  
