import { NavLink } from 'react-router-dom';
import { PATHS, MenuLinkProps } from '../../routes/paths';


const MenuLink = ({ to, name }: MenuLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${isActive ? "text-blue-700" : ""} py-2 transition-colors duration-200 relative flex items-center flex-wrap font-medium hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white`
    }
  >{name}</NavLink>
)

const routes = Object.keys(PATHS);
const Menu = () => {
  return (
    <nav className="pt-8 pb-8 pl-8 font-normal text-base">
      <ul className="mb-0 list-unstyled">

        {routes.map((key) => {
          const { to, name }:MenuLinkProps = PATHS[key];
          return <li key={key}>
            <MenuLink
              to={to}
              name={name}
            />
          </li>
          })}
      </ul>
    </nav>
  );
}
  
export default Menu
