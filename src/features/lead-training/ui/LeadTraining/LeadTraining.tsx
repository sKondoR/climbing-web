import { useEffect } from 'react'

import { LeadTrainingChart } from './LeadTrainingChart'
import { useUserStore } from '../../../user/user.store'
import { useLeadTrainingStore } from '../../lead-training.store'
import ScoresCalc from '../ScoresCalc/ScoresCalc'
import ScoresList from '../ScoresCalc/ScoresList'
import LeadTrainingForm from '../LeadTrainingForm/LeadTrainingForm'

const TEST_USER_ID = 1;

const LeadTraining = () => {
  const { user } = useUserStore()
  const {
    trainings,
    fetchLeadTraining,
    isLeadTrainingFetching,
  } = useLeadTrainingStore()
  
  useEffect(() => {
    if(user?.id !== undefined) fetchLeadTraining(user.id || TEST_USER_ID)
  }, [fetchLeadTraining, user?.id]);

  if (isLeadTrainingFetching) return 'Loading...'
  
  return (<>
    <div className="flex">
      <div className="bg-white p-4" style={{ width: '400px' }}>
        <LeadTrainingForm />
      </div>
      <div className="bg-white p-4 ml-4 grow">
        <LeadTrainingChart data={trainings} />
      </div>
    </div>
    <div>
      <ScoresCalc />
      <ScoresList />
    </div>
  </>);
};

export default LeadTraining;