 
import { IAllClimber } from '../user/user.interfaces'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

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
}

export interface IClimbers {
    [U: string]: IClimber
}

export interface IClimberGroup {
    label: string,
    icon: IconDefinition,
    items: IAllClimber[],
    offset: number,
}

export interface IAllClimbLink {
    allClimbId: number,
    updatedAt: string | null,
}

export interface IChartSettings {
    isLead: boolean,
    isTopRope: boolean,
    is6: boolean,
    is7: boolean,
    is8: boolean
}