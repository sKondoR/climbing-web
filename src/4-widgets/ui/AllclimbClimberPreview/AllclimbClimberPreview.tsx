import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useLayoutStore } from '../../../6-entities/layout/layout.store';

import UpdateAllClimbBtn from '../../../5-features/updateAllclimbers/ui/UpdateAllClimbBtn/UpdateAllClimbBtn';
import ClimberInfo from '../../../6-entities/allclimber/ui/ClimberInfo/ClimberInfo';
import ClimberPreview from '../../../6-entities/allclimber/ui/ClimberPreview/ClimberPreview';
import { IChartSettings } from '../../../7-shared/types/chart.types';
import { useState } from 'react';
import RoutesFilter from '../../../7-shared/ui/RoutesFilter/RoutesFilter';

const AllclimbClimberPreview = () => {
  const {
    climberPreviewId,
    setClimberPreviewId,
    isUserEdit,
  } = useLayoutStore();

  const [settings, setSettings] = useState({
    isLead: true,
    isTopRope: true,
    is6: false,
    is7: true,
    is8: true,
    sortByCategory: false,
  } as IChartSettings);

  const onSettingsChange = (newSettings: IChartSettings): void => {
    setSettings(newSettings);
  };

  return (<>
    <div className="flex justify-between py-3 px-5">
      <ClimberInfo />
      {climberPreviewId !== null && <div onClick={() => setClimberPreviewId(null)} className="text-2xl cursor-pointer hover:text-orange-500">
        <FontAwesomeIcon
          icon={faTimes}
          className="mt-1"
        />
      </div>}
    </div>
    <div className="bg-white/40 py-2 pl-5 pr-3">   
      <RoutesFilter settings={settings} onSettingsChange={onSettingsChange} />
    </div>
    <div className="w-full h-full bg-white/40 overflow-y-auto overflow-x-hidden pt-3 pb-3 pl-5 pr-3">    
      <ClimberPreview settings={settings} />
    </div>
    {(climberPreviewId !== null || isUserEdit) && <UpdateAllClimbBtn />}
  </>)
}
  
export default AllclimbClimberPreview;