import Week from '../../features/user/ui/WeekSchedule/Week'
import LeadTraining from '../../features/lead-progress/ui/LeadTraining/LeadTraining'
const Contacts = () => {
    return (
      <>
      <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
        <div className="pl-8 pt-8 pb-8 h-full overflow-y-auto	overflow-x-hidden">
          <div>Расписание</div>
          <div>Прогресс трудности</div>
          <div>Новые категории</div>
        </div>
      </aside>
      <div className="relative h-full overflow-y-auto ml-96">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-white p-4"><Week /></div>
          <div className="bg-white p-4"><LeadTraining /></div>
        </div>
      </div>
    </>)
}
  
export default Contacts