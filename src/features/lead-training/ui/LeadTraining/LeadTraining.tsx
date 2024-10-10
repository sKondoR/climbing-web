import { useEffect } from 'react'

import { LeadTrainingChart } from './LeadTrainingChart'
import Calendar from './Calendar'
import { useUserStore } from '../../../user/user.store';
import { useLeadTrainingStore } from '../../lead-training.store';
import { ILeadTraining } from '../../lead-training.interfaces';

const TEST_USER_ID = 1;

const LeadTraining = () => {
  const { user } = useUserStore()
  const {
    trainings,
    fetchLeadTraining,
    setLeadTraining,
    isLeadTrainingFetching,
  } = useLeadTrainingStore()
  
  useEffect(() => {
    if(user?.id !== undefined) fetchLeadTraining(user.id || TEST_USER_ID)
  }, [fetchLeadTraining, user?.id]);

  const setData = (data: ILeadTraining) => {
    setLeadTraining({
      id: data.id,
      date: data.date,
      userId: user?.id || TEST_USER_ID, //hardcoded user id
      routes: data.routes,
    })
  }


  if (isLeadTrainingFetching) return 'Loading...'
  
  return (
    <div className="flex">
      <div className="bg-white p-4" style={{ width: '400px' }}>
        <Calendar data={trainings} setData={setData} />
      </div>
      <div className="bg-white p-4 ml-4 grow">
        <LeadTrainingChart data={trainings} />
      </div>
    </div>
  );
};

export default LeadTraining;