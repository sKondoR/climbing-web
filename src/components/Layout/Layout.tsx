import { Outlet } from 'react-router-dom';
import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import Header from '../Header/Header';

const Layout = () => {
  return (<>
    <Header />
      <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96s h-full pt-16 duration-75 transition-width">
        <div className="p-8 mr-4"><ClimbersTabs /></div>
      </aside>
      <main id="main-content" className="relative w-full h-full overflow-y-auto ml-96 p-8">
        <Outlet />
      </main>
  </>);
}
  
export default Layout
