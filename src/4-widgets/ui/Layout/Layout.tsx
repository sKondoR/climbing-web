import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../../../4-widgets/ui/Header/Header';
import { useClimbersStore } from '../../../6-entities/allclimber/climbers.store';
import { useUserStore } from '../../../6-entities/user/user.store';
import { useTeamStore } from '../../../6-entities/spbteam/spbteam.store';
import { PRIVATE_ROUTES } from '../../../7-shared/constants/paths.constants';

import useIsPage from '../../../7-shared/hooks/useIsPage';
import { useHealthyStore } from '../../../6-entities/healthy/healthy.store';
import CustomModal from '../../../7-shared/ui/CustomModal/CustomModal';
import { Spinner } from '@material-tailwind/react';

const Layout = () => {
  const { isHealthy, isHealthyFetching } = useHealthyStore();

  useEffect(() => {
    // fetchHealthy();
  }, []);

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLandingPage } = useIsPage();
  const {
    user,
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

    // if (!user?.id && status !== RequestState.LOADING && token) {
    //   // getVKProfile().catch(() => {
    //   //   navigate('/signin');
    //   //   logoutVk();
    //   // });
    // }
  }, [user, status, navigate, pathname, getVKProfile, logoutVk]);

    if (isHealthyFetching || !isHealthy) {
    <CustomModal
      defaultOpen={true}
      title="test"
    >
      <div className="flex px-10 py-10 justify-center">
        <div className="flex align-items">
          {isHealthyFetching && (<><Spinner className="mr-5 text-lg"/> Идет проверка подключение к базе данных...</>)}
          {!isHealthy && (<>Ошибка подключения к базе данных. Попробуйте позже.</>)}
        </div>
      </div>
    </CustomModal>
  }
  return (<>
    <Header />
    <main id="main-content" className={`relative w-full h-full text-left ${isLandingPage ? '' : 'pt-[64px]'}`}>
      <Outlet />
    </main>
    {(isHealthyFetching || !isHealthy) ?
      <CustomModal
        defaultOpen={true}
        title="test"
        className="bg-orange-500 text-white"
      >
        <div className="flex px-10 py-10 justify-center">
          <div className="flex align-items">
            {isHealthyFetching && (<><Spinner className="mr-5 text-lg"/> Идет проверка подключение к базе данных...</>)}
            {!isHealthy && (<>Ошибка подключения к базе данных. Попробуйте позже.</>)}
          </div>
        </div>
      </CustomModal>: null
    }
  </>);
}
  
export default Layout;
