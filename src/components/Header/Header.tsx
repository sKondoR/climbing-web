import { useEffect } from 'react'
import { useClimbersStore } from '../../features/climbers/climbers.store'
import { useUserStore } from '../../features/user/user.store'
import UserIcon from '../../features/user/ui/UserIcon/UserIcon'
import UpdateButton from '../../features/climbers/ui/UpdateButton/UpdateButton'
import useFirstRender from '../../hooks/useFirstRender'

let a = 0;
const Header = () => {
  const isFirstRender = useFirstRender()
  const { fetchClimbers } = useClimbersStore()
  const { fetchUser } = useUserStore()
  
  useEffect(() => {
    if (isFirstRender && !a) {
      fetchUser(35292)
      fetchClimbers()
      a = 1
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender]);

  return (
    <header className="fixed z-30 w-full bg-gray-100 dark:bg-gray-800 pt-4 pb-4 pr-8 pl-8">
      <div className="flex justify-between items-center">
        <h1 className="text-blue-700">SpbClimbers</h1>
        <div>{import.meta.env.DEV && <UpdateButton />}</div>
        <div><UserIcon /></div>
      </div>
    </header>
  )
}
  
export default Header