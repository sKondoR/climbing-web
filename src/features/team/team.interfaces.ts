 
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface ITeamMember {
    allClimbId: string | null;
    name: string | null;
    isCityTeam: boolean,
    text: string,
}

export interface ITeamGroup {
    label: string,
    icon: IconDefinition,
    items: ITeamMember[],
    offset: number,
}

export interface IAllClimbLink {
    allClimbId: number,
    updatedAt: string | null,
}
