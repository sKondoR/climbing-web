import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import img from '../../assets/climb.svg'
import { PRIVATE_ROUTES } from '../../routes/paths'

import { useClimbersStore } from '../../features/climbers/climbers.store'
import { RequestState } from '../../types/request.types'
import { useUserStore } from '../../features/user/user.store';
import { useTeamStore } from '../../features/team/team.store';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    vkUser,
    status,
    getVKProfile,
    logoutVk,
  } = useUserStore()

  const {
    fetchClimbers,
  } = useClimbersStore()

  const {
    fetchTeam,
  } = useTeamStore()

  useEffect(() => {
      fetchClimbers()
      fetchTeam()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (PRIVATE_ROUTES.includes(pathname as string) && !token)
      return navigate('/signin');

    if (!vkUser?.id && status !== RequestState.LOADING && token) {
      // getVKProfile().catch(() => {
      //   navigate('/signin');
      //   logoutVk();
      // });
    }
  }, [vkUser, status, navigate, pathname, getVKProfile, logoutVk]);

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
    <main id="main-content" className="relative w-full h-full p-8">
      <Outlet />
    </main>
  </>);
}
  
export default Layout
