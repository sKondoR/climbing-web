import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Week from '../WeekSchedule/WeekSchedule';
import { useScheduleStore } from '../../../../6-entities/schedule/schedule.store';

const Schedule = () => {
  const {
    schedule,
    isScheduleFetching,
    fetchSchedule,
  } = useScheduleStore();

  useEffect(() => {
    if(!schedule?.length) fetchSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  return (
    <>
      <h2 className="text-3xl mb-5">расписание</h2>
      <div className="bg-white pt-3 pb-3 pl-5 pr-5">
        {isScheduleFetching && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
        {schedule?.length && <Week schedule={schedule} />}
      </div>
    </>
  )
}
  
export default Schedule;