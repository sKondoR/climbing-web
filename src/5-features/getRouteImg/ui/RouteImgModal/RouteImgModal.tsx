import { Dialog, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '../../../../6-entities/allclimber/climbers.interfaces';
import { useRouteImgsStore } from '../../../../6-entities/route-imgs/route-imgs.store';
import { Loading } from '../../../../7-shared/ui/Loading';
import AddTextToImg from '../AddTextToImg/AddTextToImg';
import { RouteBadge } from '../../../../7-shared/ui/RouteBadge';

export type IRouteImgModal = {
    route: IRoute;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    children?: React.ReactNode | string;
};

const RouteImgModal = ({
  route,
  setOpen,
  open = false,  
}: IRouteImgModal) => {
  const { routeImgs } = useRouteImgsStore();
  const { name, region, grade } = route || {};
  const currentRouteImg = routeImgs[`${name}-${region}`];

  if(!open) return null;
  return (
    <Dialog open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex text-xl">
            <div>
              <RouteBadge grade={grade} />
              трасса: <span className="text-orange-500">{name}</span></div>
            <div className="grow text-right">регион: <span className="text-blue-500">{region}</span></div>
            <div className="w-10">
              <Dialog.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                className="absolute text-xl right-2 top-2 hover:text-orange-500 cursor-pointer"
                isCircular
                onClick={() => setOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                />
              </Dialog.DismissTrigger>
            </div>
          </div>
          <hr className="my-2"/>
          <div className="overflow-y-auto h-[80vh]">
            {currentRouteImg.isFetching ? <div className="align-center py-10"><Loading text="загрузка изображения трассы с AllClimb, это может занять около минуты..." /></div> : null}
            {currentRouteImg?.error && !currentRouteImg.isFetching ? <div className="align-center py-10">{currentRouteImg.error }</div> : null}
            {!currentRouteImg?.error && currentRouteImg.imageData && !currentRouteImg.isFetching ? 
              <AddTextToImg
                imgSrc={`data:image/png;base64,${currentRouteImg.imageData}`}
                name={name}
                region={region}
                grade={grade}
              />
              : null
            }            
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default RouteImgModal;
