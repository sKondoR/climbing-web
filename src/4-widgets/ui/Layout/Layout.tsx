import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../../../4-widgets/ui/Header/Header';
import { useClimbersStore } from '../../../6-entities/allclimber/climbers.store';
import { useUserStore } from '../../../6-entities/user/user.store';
import { useTeamStore } from '../../../6-entities/spbteam/spbteam.store';
import { PRIVATE_ROUTES } from '../../../7-shared/constants/paths.constants';
import { RequestState } from '../../../7-shared/types/request.types';
import useIsPage from '../../../7-shared/hooks/useIsPage';

const Layout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLandingPage } = useIsPage();
  const {
    vkUser,
    status,
    getVKProfile,
    logoutVk,
  } = useUserStore();

  const {
    climbers,
    fetchClimbers,
  } = useClimbersStore();

  const {
    fetchTeam,
  } = useTeamStore();

  useEffect(() => {
    if(!climbers?.length) {
      fetchClimbers();
    }
  }, [climbers?.length]);

  useEffect(() => {
      fetchTeam();
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
    <Header />
    <main id="main-content" className={`relative w-full h-full text-left ${isLandingPage ? '' : 'pt-[64px]'}`}>
      <Outlet />
    </main>
  </>);
}
  
export default Layout;
