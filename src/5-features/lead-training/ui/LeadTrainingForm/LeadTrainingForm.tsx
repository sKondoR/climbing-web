import Calendar from './Calendar'
import { useUserStore } from '../../../../6-entities/user/user.store';
import RoutesForm from './RoutesForm';

const LeadTrainingForm = () => {
  const { user } = useUserStore()
  
  if (!user?.id) return;

  return (<>
    <Calendar />
    <RoutesForm />
  </>);
};

export default LeadTrainingForm;