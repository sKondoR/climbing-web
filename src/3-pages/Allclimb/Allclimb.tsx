import { useEffect } from 'react';
// import CustomModal from '../../7-shared/ui/CustomModal/CustomModal';

import { useUserStore } from '../../6-entities/user/user.store';
import { useLayoutStore } from '../../6-entities/layout/layout.store';
import { useClimbersStore } from '../../6-entities/allclimber/climbers.store';

import bg1 from '../../7-shared/assets/images/bg1.jpg';
// import { Spinner } from '@material-tailwind/react/dist/components/spinner';
import { AllclimbClimbers } from '../../4-widgets/ui/AllclimbClimbers';
import { AllclimbEditClimber } from '../../4-widgets/ui/AllclimbEditClimber';
import { AllclimbClimberPreview } from '../../4-widgets/ui/AllclimbClimberPreview';
import ClimbersChart from '../../6-entities/allclimber/ui/ClimbersChart/ClimbersChart';

const Allclimb = () => {
  const { addDefaultGroupsToUser } = useUserStore();
  const {
    climbers,
    fetchClimbers,
    isFetchingAllClimb
  } = useClimbersStore();
  const {
    climberPreviewId,
    isUserEdit,
  } = useLayoutStore();

  useEffect(() => {
    if(!climbers?.length) {
      fetchClimbers();
    }
  }, [climbers?.length]);

  useEffect(() => {
    // for tests
    // addDefaultGroupsToUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDefaultGroupsToUser]);

  if (isFetchingAllClimb) {
    // return <CustomModal
    //   defaultOpen={true}
    //   title="test"
    // >
    //   <div className="flex px-10 py-10 justify-center">
    //     <div className="flex align-items"><Spinner className="mr-5 text-lg"/> Идет загрузка AllClimb скалолазов...</div>
    //   </div>
    // </CustomModal>
  }

  // text-gray-200 bg-slate-700/80
  return (<>
    <aside className="fixed w-[700px] top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-[64px]
        duration-75 transition-width bg-slate-300"
          style={{
        backgroundImage: `url("${bg1}")`,
      }}
    >
      <div className={`flex flex-col flex-shrink-0 h-full text-gray-800 ${climberPreviewId === null && !isUserEdit ? 'bg-lime-300/90' : 'bg-lime-300/90'} backdrop-blur-[2px]`}>
      {climberPreviewId === null && !isUserEdit ?
        <AllclimbClimbers />
      : null }
      {isUserEdit ?
        <AllclimbEditClimber />
      : null}
      {climberPreviewId !== null && !isUserEdit ?
        <AllclimbClimberPreview />
      : null}    
      </div>
    </aside>
    <div className="relative h-full overflow-y-auto ml-[700px]">
      <div className="bg-white pt-3 pb-3 pl-5 pr-5">
        <h2 className="text-2xl mb-2">пролазы по категориям</h2>
        <ClimbersChart />
      </div>
    </div>
  </>)
}
  
export default Allclimb;