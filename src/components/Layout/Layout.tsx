import { Outlet } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';

const Layout = () => {
  return (<>
    <Header />
        <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width">
          <Menu />
        </aside>
        <main id="main-content" className="relative w-full h-full overflow-y-auto lg:ml-64 p-8">
          <div className="bg-white p-8">
            <Outlet />
          </div>
        </main>
  </>);
}
  
export default Layout
