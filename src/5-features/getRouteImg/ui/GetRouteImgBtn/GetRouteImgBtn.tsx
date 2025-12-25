import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faImage } from '@fortawesome/free-solid-svg-icons';

import { useRouteImgsStore } from '../../../../6-entities/route-imgs/route-imgs.store';
import useAnimate from '../../../../7-shared/hooks/useAnimate';
import { IRoute } from '../../../../6-entities/allclimber/climbers.interfaces';
import { RouteImgModal } from '../RouteImgModal';

const GetRouteImgBtn = ({ route }: { route: IRoute }) => {
  const [isAnimating, setIsAnimating] = useAnimate(1000);
  const [open, setOpen] = useState(false);

  const { routeImgs, fetchRouteImg } = useRouteImgsStore();

  const onClick = () => {
    setOpen(true);
    setIsAnimating(true);
    fetchRouteImg(route);
  };

  const { name, region } = route || {};
  const currentRouteImg = routeImgs[`${name}-${region}`];

  return (
    <>
      <div
          className={`inline cursor-pointer
            transition-all duration-300s
            ${currentRouteImg?.error ? 'text-gray-300' : 'text-blue-500 hover:text-orange-500'}
            ${isAnimating ? 'animate-ping scale-1' : ''}
          `} 
          onClick={onClick}
          title="скачать изображение трассыы"
      >
          <FontAwesomeIcon
            icon={faImage}
          />
      </div>
      <RouteImgModal route={route} open={open} setOpen={setOpen} />
    </>
  )
}
  
export default GetRouteImgBtn;
