import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../4-widgets/ui/Header/Header'
import { PRIVATE_ROUTES } from '../../../7-shared/constants/paths'

import { useClimbersStore } from '../../../5-features/climbers/climbers.store'
import { RequestState } from '../../../7-shared/types/request.types'
import { useUserStore } from '../../../5-features/user/user.store'
import { useTeamStore } from '../../../5-features/team/team.store'
import useIsPage from '../../../7-shared/hooks/useIsPage'

const Layout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLandingPage } = useIsPage();
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
    <Header />
    <main id="main-content" className={`relative w-full h-full text-left ${isLandingPage ? '' : 'pt-[64px]'}`}>
      <Outlet />
    </main>
  </>);
}
  
export default Layout
