import { PATHS } from '../../../../7-shared/constants/paths.constants';
import Menu from '../../../../7-shared/ui/Menu/Menu';

const VerticalMenu = () => {
  return <Menu
    paths={{
      competitions: PATHS.competitions,
      leadsHistory: PATHS.leadsHistory,
      schedule: PATHS.schedule,
    }}
    isVertical={true}
  />
};
  
export default VerticalMenu;
