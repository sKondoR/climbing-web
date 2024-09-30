export type MenuLinkProps = {
    to: string;
    name: string;
  };

interface Map {
    [key: string]: MenuLinkProps
}

export const PATHS:Map = {
    home: {
        to: '/',
        name: 'Home'
    },
    climbers: {
        to: 'climbers',
        name: 'Climbers'
    },
    contacts: {
        to: 'contacts',
        name: 'Contacts'
    }
};