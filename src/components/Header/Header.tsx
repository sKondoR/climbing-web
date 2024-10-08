import Menu from '../Menu/Menu'
import VKButton from '../../features/user/ui/VKButton/VKButton'
import UpdateButton from '../../features/climbers/ui/UpdateButton/UpdateButton'

const Header = () => {
  return (
    <header className="fixed z-30 w-full bg-gray-100 dark:bg-gray-800 pt-4 pb-4 pr-8 pl-8">
      <div className="flex justify-between items-center">
        <h1 className="text-blue-700">SpbClimbingTeam</h1>
        <Menu />
        <div>
          {import.meta.env.DEV && <UpdateButton />}
        </div>
        <div className="flex">
          <VKButton />
        </div>
      </div>
    </header>
  )
}
  
export default Header