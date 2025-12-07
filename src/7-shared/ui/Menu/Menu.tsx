import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

export type MenuLinkProps = {
  to: string;
  name: string;
  inMenu?: boolean | undefined;
};

const MenuLink = ({ to, name }: MenuLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `py-2 transition-colors duration-200 relative flex items-center flex-wrap font-medium border-transparent text-white hover:text-orange-500`
      + (isActive ? ' text-orange-500' : '')
    }
  >{name}</NavLink>
)

const routes = Object.keys(PATHS);
const Menu = () => {
  return (
    <ul className="flex font-normal text-base list-unstyled">
      {routes
        .map((key) => {
        const { to, name, inMenu }: MenuLinkProps = PATHS[key];
        if (!inMenu) return null;
        return <li key={key} className="flex-none mr-8">
          <MenuLink
            to={to}
            name={name}
          />
        </li>
        })}
    </ul>
  );
}
  
export default Menu
