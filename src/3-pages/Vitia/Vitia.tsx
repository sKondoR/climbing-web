import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import { PATHS } from '../../7-shared/constants/paths.constants'; 
import bg1 from '../../7-shared/assets/images/bg1.jpg';
import VerticalMenu from './ui/VerticalMenu/VerticalMenu';

const Progress = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (pathname === `/${PATHS.vitia.to}`) {
      navigate(PATHS.competitions.to);
    }
  }, [navigate, pathname]);

  return (
    <>
      <aside className="fixed w-[500px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px]
          duration-75 transition-width bg-slate-300"
            style={{
          backgroundImage: `url("${bg1}")`,
        }}
      >
        <div className={`flex flex-col flex-shrink-0 h-full text-gray-800 bg-lime-300/90 backdrop-blur-[2px]`}>
          <div className="py-5">
            <VerticalMenu />
          </div>
        </div>
      </aside>
      <div className="relative h-full overflow-y-auto ml-[500px] pt-3 pb-3 pr-5 pl-5">
        <Outlet />
      </div>
    </>
  )
}
  
export default Progress