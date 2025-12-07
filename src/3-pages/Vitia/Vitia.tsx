import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'

import { PATHS } from '../../7-shared/constants/paths.constants'
import Aside from './ui/Aside/Aside'

const Progress = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (pathname === `/${PATHS.vitia.to}`) {
      navigate(PATHS.competitions.to)
    }
  }, [navigate, pathname]);

  return (
    <>
      <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
        <Aside />
      </aside>
      <div className="relative h-full overflow-y-auto ml-96 pt-3 pb-3 pr-5 pl-5">
        <Outlet />
      </div>
    </>
  )
}
  
export default Progress