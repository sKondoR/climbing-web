import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths.constants';

export type MenuProps = {
  paths?: Record<string, MenuLinkProps>;
  isVertical?: boolean,
  isHeaderMenu?: boolean,
};

export type PathProps = {
    [key: string] : MenuLinkProps
};

export type MenuLinkProps = {
  to: string;
  name: string;
  isHeaderMenu?: boolean;
  inMenu?: boolean,
};

const MenuLink = ({
  to,
  name,
  isHeaderMenu = false,
}: MenuLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `py-2 transition-colors duration-200 relative font-medium border-transparent
      ${isHeaderMenu ? ` flex items-center flex-wrap text-white hover:text-orange-500 ${isActive ? ' text-orange-500' : ''}` : ''}
      ${!isHeaderMenu ? ` flex pl-5 py-2 text-white bg-teal-700/50 hover:bg-orange-500 hover:text-white ${isActive ? ' bg-orange-500 ' : ''}` : ''}
      `
    }
  >{name}</NavLink>
)

const Menu = ({
  paths,
  isVertical = false,
  isHeaderMenu = false,
}: MenuProps) => {
  const source = paths || PATHS;
  const routes = Object.keys(source);
  return (
    <ul className={`${isVertical ? '' : 'flex'} font-normal text-base list-unstyled`}>
      {routes
        .map((key) => {
        const { to, name, inMenu }: MenuLinkProps = source[key];
        if(isHeaderMenu && !inMenu) return null;
        return <li key={key} className={`flex-none ${isHeaderMenu ? 'mr-8' : 'mb-1'}`}>
          <MenuLink
            to={to}
            name={name}
            isHeaderMenu={isHeaderMenu}
          />
        </li>
        })}
    </ul>
  );
}
  
export default Menu;
