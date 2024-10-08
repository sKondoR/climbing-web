import { useState } from 'react'

import { LeadTrainingChart } from './LeadTrainingChart'
import Calendar from './Calendar';
import { ITrainingDay } from './lead-training.interfaces'

const LeadTraining = () => {
  const [data, setData] = useState<ITrainingDay[]>([]);
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}
    >
      <LeadTrainingChart data={data} />
      <Calendar data={data} setData={setData} />
    </div>
  );
};

export default LeadTraining;