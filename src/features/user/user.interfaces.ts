export enum IGrant {
    ADMIN = 0,
    USER = 1,
}

export interface IUnregisteredUser {
    allClimbId: number | null | undefined;
    grant: IGrant;
    team: IAllClimber[];
    friends: IAllClimber[];
    pro: IAllClimber[];
}

export interface IUser {
    id: number | null;
    vk_id: number | null;
    allClimbId: number | null| undefined;
    name: string | null;
    avatar_url: string | null;
    grant: IGrant;
    password: string | null;
    team: IAllClimber[];
    friends: IAllClimber[];
    pro: IAllClimber[];
    token: string | null;
}

export interface IAllClimber {
    allClimbId: number | null | undefined;
    name: string | null;
}  

export interface IVKCodeData {
    code: string;
    device_id: string;
    state: string;
    code_verifier: string;
}  