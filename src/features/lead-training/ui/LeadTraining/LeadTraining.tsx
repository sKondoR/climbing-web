import { useEffect } from 'react'

import { LeadTrainingChart } from './LeadTrainingChart'
import Calendar from './Calendar'
import { useUserStore } from '../../../user/user.store';
import { useLeadTrainingStore } from '../../lead-training.store';
import { ILeadTrainingProps } from '../../lead-training.interfaces';

const TEST_USER_ID = 26;

const LeadTraining = () => {
  const { user } = useUserStore()
  const {
    trainings,
    fetchLeadTraining,
    setLeadTraining,
    isLeadTrainingFetching,
  } = useLeadTrainingStore()
  
  useEffect(() => {
    if(!trainings && user?.id) fetchLeadTraining(user.id || TEST_USER_ID)
  }, [fetchLeadTraining, trainings, user]);

  const setData = (data: ILeadTrainingProps) => {
    setLeadTraining({
      date: `${data.day}-${data.month}-${data.year}`,
      userId: user?.id || TEST_USER_ID, //hardcoded user id
      routes: ['7a', '7b', '7a+', '6c'],
    })
  }

  if (isLeadTrainingFetching) return 'Loading...'
  
  return (
    <div className="flex">
      <div style={{ width: '300px' }}>
      <Calendar data={trainings} setData={setData} />
      </div>
      <LeadTrainingChart data={trainings} />
    </div>
  );
};

export default LeadTraining;