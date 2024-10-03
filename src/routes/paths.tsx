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
    climbers: {
        to: 'climbers',
        name: 'AllClimb'
    },
    contacts: {
        to: 'contacts',
        name: 'Контакты'
    }
};