import Menu from '../Menu/Menu';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import VKButton from '../../features/user/ui/VKButton/VKButton';
import bg1 from '../../assets/bg1.jpg'
import useIsPage from '../../hooks/useIsPage';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const { isLandingPage } = useIsPage();

  return (
    <header
      className={'fixed z-30 w-full' 
        + (isLandingPage ? ' ' : ' bg-gray-100')
        + (isLandingPage && (scrollDirection === 'down' ? ' -translate-y-full' : ' translate-y-0'))
      }
      style={{
        backgroundImage: isLandingPage ? '' : `url("${bg1}")`,
      }}
    >
      <div className={`w-full h-full ${isLandingPage ? '' : 'bg-gradient-to-b from-black/100 to-black/50'}`}>
        <div className={`flex pt-3 pb-3 pr-5 pl-5 justify-between items-center ${isLandingPage ? '' : 'bg-teal-400/30'}`}>
          <h1 className="text-3xl text-white">Spb<span className="text-orange-500">Climb</span>Kids</h1>
          <Menu />
          <VKButton />
        </div>
      </div>
    </header>
  )
}
  
export default Header