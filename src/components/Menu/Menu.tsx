import { NavLink } from 'react-router-dom';
import { PATHS, MenuLinkProps } from '../../routes/paths';


const MenuLink = ({ to, name }: MenuLinkProps) => (
  <NavLink
    to={to}
    style={({ isActive }) => isActive ? { color: 'red' } : {}}
    // toDo: do active by class
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className={({ isActive }) =>
      `py-2 transition-colors duration-200 relative flex items-center flex-wrap font-medium hover:text-gray-900` +
      `text-gray-500`
    }
  >{name}</NavLink>
)

const routes = Object.keys(PATHS);
const Menu = () => {
  return (
    <ul className="flex font-normal text-base list-unstyled">
      {routes.map((key) => {
        const { to, name }:MenuLinkProps = PATHS[key];
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
