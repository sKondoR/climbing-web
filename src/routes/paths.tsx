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
        to: 'schedule',
        name: 'Расписание',
        inMenu: true,
    },
    progress: {
        to: 'progress',
        name: 'Прогресс',
        inMenu: true,
    },
    lead: {
        to: 'lead',
        name: 'Тренировки трудности',
        inMenu: false,
    },
    competitions: {
        to: 'competitions',
        name: 'Соревнования',
        inMenu: false,
    },
    rocks: {
        to: 'rocks',
        name: 'Скалы',
        inMenu: false,
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты',
        inMenu: false,
    }
};