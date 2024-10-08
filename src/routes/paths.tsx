export type MenuLinkProps = {
    to: string;
    name: string;
    inMenu: boolean | undefined;
  };

interface Map {
    [key: string] : MenuLinkProps
}

export const PRIVATE_ROUTES : string[] = [];

export const PATHS : Map = {
    home: {
        to: '/',
        name: 'Команда',
        inMenu: true,
    },
    allclimb: {
        to: 'allclimb',
        name: 'AllClimb',
        inMenu: true,
    },
    schedule: {
        to: 'trainings/schedule',
        name: 'Тренировки',
        inMenu: true,
    },
    lead: {
        to: 'trainings/lead',
        name: 'Тренировки трудности',
        inMenu: false,
    },
    rocks: {
        to: 'trainings/rocks',
        name: 'Скалы',
        inMenu: false,
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты',
        inMenu: false,
    }
};