import { useClimbersStore } from '../../../6-entities/allclimber/climbers.store';
import Multiselect from '../../../7-shared/ui/Multiselect/Multiselect';

const EditUserAllClimbButton = () => {
  const { climbers } = useClimbersStore();

  const climberOptions = Object.keys(climbers);

  return (<>
    <Multiselect
      options={climberOptions}
      placeholder="Choose frameworks"
    />
  </>)
}
  
export default EditUserAllClimbButton;