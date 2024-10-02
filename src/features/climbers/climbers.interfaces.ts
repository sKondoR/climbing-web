 
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