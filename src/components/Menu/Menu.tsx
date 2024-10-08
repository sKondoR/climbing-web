import { NavLink } from 'react-router-dom';
import { PATHS, MenuLinkProps } from '../../routes/paths';

export type Props = {
  to: string;
  name: string;
};

const MenuLink = ({ to, name }: Props) => (
  <NavLink
    to={to}
    style={({ isActive }) => isActive ? { color: 'red' } : {}}
    className="py-2 transition-colors duration-200 relative flex items-center flex-wrap font-medium hover:text-gray-900 text-gray-500"
  >{name}</NavLink>
)

const routes = Object.keys(PATHS);
const Menu = () => {
  return (
    <ul className="flex font-normal text-base list-unstyled">
      {routes
        .map((key) => {
        const { to, name, inMenu }:MenuLinkProps = PATHS[key];
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
