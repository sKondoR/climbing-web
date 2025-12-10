import { ICustomAllClimber } from '../user/user.interfaces';

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
    isTopRope: boolean;
    grade: string;
    name: string;
    date: string;
    text: string;
}

export interface IClimbers {
    [U: string]: IClimber;
}

export interface IClimberGroup {
    label: string;
    items: ICustomAllClimber[];
    offset?: number;
}
export interface IAllClimbLink {
    allClimbId: number;
    updatedAt: string | null;
}

export interface IChartSettings {
    isLead: boolean;
    isTopRope: boolean;
    is6: boolean;
    is7: boolean;
    is8: boolean;
    sortByCategory: boolean;
}

export interface IPlotsVisibility {
    [U: string]: boolean;
}