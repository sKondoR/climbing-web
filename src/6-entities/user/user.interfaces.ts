export enum IGrant {
    ADMIN = 0,
    USER = 1,
}

export interface IUnregisteredUser {
    id: number | null;
    allClimbId: number | null | undefined;
    grant: IGrant;
    team: ICustomAllClimber[];
    friends: ICustomAllClimber[];
    pro: ICustomAllClimber[];
}

export interface IUser {
    id: number;
    vk_id: number | null;
    allClimbId: number | null| undefined;
    name: string | null;
    avatar_url: string | null;
    grant: IGrant;
    password: string | null;
    team: ICustomAllClimber[];
    friends: ICustomAllClimber[];
    pro: ICustomAllClimber[];
    token: string | null;
}

export interface IAllClimber {
    allClimbId: number | null | undefined;
    name: string | null;
}  

export interface ICustomAllClimber {
    allClimbId: number;
    customName: string | null;
}  

export interface IVKCodeData {
    code: string;
    device_id: string;
    state: string;
    code_verifier: string;
}  