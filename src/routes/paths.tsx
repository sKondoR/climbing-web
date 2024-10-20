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
        name: 'Обо мне',
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
        inMenu: true,
    },
    leadTrainings: {
        to: 'lead-tracking',
        name: 'Трэкинг трудности',
        inMenu: true,
    },
    leadsHistory: {
        to: 'leads-history',
        name: 'История категорий',
        inMenu: false,
    },
    competitions: {
        to: 'competitions',
        name: 'Соревнования',
        inMenu: false,
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты',
        inMenu: false,
    }
};