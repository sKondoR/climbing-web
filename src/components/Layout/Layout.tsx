import { useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import Header from '../Header/Header'
import img from '../../assets/climb.svg'
import { PRIVATE_ROUTES } from '../../routes/paths'
import { RequestState } from '../../types/request.types'
import { useUserStore } from '../../features/user/user.store';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useParams();
  const {
    vkUser,
    status,
    getVKProfile,
    logoutVK,
  } = useUserStore()

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (PRIVATE_ROUTES.includes(pathname as string) && !token)
      return navigate('/signin');

    if (!vkUser?.id && status !== RequestState.LOADING && token) {
      getVKProfile().catch(() => {
        navigate('/signin');
        logoutVK();
      });
    }
  }, [vkUser, status, getVKProfile, logoutVK, navigate, pathname]);

  return (<>
    <img src={img} alt="" style={{
      width: '200px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      opacity: 0.2,
    }}/>
    <Header />
      <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
        <div className="pl-8 pt-8 pb-8"><ClimbersTabs /></div>
      </aside>
      <main id="main-content" className="relative w-full h-full overflow-y-auto ml-96 p-8">
        <Outlet />
      </main>
  </>);
}
  
export default Layout
