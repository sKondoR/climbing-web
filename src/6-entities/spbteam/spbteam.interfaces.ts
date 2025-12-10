
export interface ITeamMember {
    group: any;
    isCoach: boolean | null;
    allClimbId: string | null;
    name: string;
    year: string | null;
    isCityTeam: boolean | null;
    text: string | null;
}

export interface ITeamGroup {
    label: string,
    items: ITeamMember[],
    offset: number,
}

export interface IAllClimbLink {
    allClimbId: number,
    updatedAt: string | null,
}
