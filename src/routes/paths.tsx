export type MenuLinkProps = {
    to: string;
    name: string;
  };

interface Map {
    [key: string] : MenuLinkProps
}

export const PRIVATE_ROUTES : string[] = [];

export const PATHS : Map = {
    home: {
        to: '/',
        name: 'Команда'
    },
    allclimb: {
        to: 'allclimb',
        name: 'AllClimb'
    },
    schedule: {
        to: 'schedule',
        name: 'Расписание'
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты'
    }
};