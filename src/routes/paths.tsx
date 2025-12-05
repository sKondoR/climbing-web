export type MenuLinkProps = {
    to: string;
    name: string;
    inMenu: boolean | undefined;
  };

interface Map {
    [key: string] : MenuLinkProps
}

export const PRIVATE_ROUTES : string[] = [
    
];

export const PATHS : Map = {
    home: {
        to: '/',
        name: 'Команда',
        inMenu: true,
    },
    vitia: {
        to: 'vitia',
        name: 'Витя',
        inMenu: true,
    },
    allclimb: {
        to: 'allclimb',
        name: 'AllClimb',
        inMenu: true,
    },
    schedule: {
        to: 'schedule',
        name: 'Расписание',
        inMenu: false,
    },
    leadTrainings: {
        to: 'lead-tracking',
        name: 'Трэкинг трудности',
        inMenu: false,
    },
    leadsHistory: {
        to: 'leads-history',
        name: 'История категорий',
        inMenu: false,
    },
    competitions: {
        to: 'competitions',
        name: 'История cоревнований',
        inMenu: false,
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты',
        inMenu: false,
    }
};