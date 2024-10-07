 
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface ITeamMember {
    isCoach: boolean | null;
    allClimbId: string | null;
    name: string;
    year: string | null;
    isCityTeam: boolean | null;
    text: string | null;
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
