import { useEffect } from 'react'
import Week from '../../features/schedule/ui/WeekSchedule/WeekSchedule'
import { useScheduleStore } from '../../features/schedule/schedule.store'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Loading  from '../../components/Loading/Loading'

const Contacts = () => {
  const {
    schedule,
    isScheduleFetching,
    fetchSchedule,
  } = useScheduleStore()

  useEffect(() => {
    if(!schedule?.length) fetchSchedule()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  return (
    <>
      <div className="bg-white p-4">
      <Loading isLoading={isScheduleFetching} />
        {schedule?.length && <Week schedule={schedule} />}
      </div>
    </>
  )
}
  
export default Contacts