export enum IGrant {
    ADMIN = 0,
    USER = 1,
}

export interface IUnregisteredUser {
    groups: IClimberGroup[];
}

export interface IUser {
    id: number;
    vk_id: number | null;
    name: string | null;
    avatar_url: string | null;
    grant: IGrant;
    password: string | null;
    groups: IClimberGroup[];
    token: string | null;
}

export interface IAllClimber {
    allClimbId: number;
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

export interface IClimberGroup {
    name: string;
    items: ICustomAllClimber[];
    offset?: number | undefined;
}