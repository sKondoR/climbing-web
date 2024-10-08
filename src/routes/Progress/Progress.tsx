import LeadTraining from '../../features/progress/ui/LeadTraining/LeadTraining'
import Aside from '../../features/progress/ui/Aside/Aside'
const Progress = () => {
    return (
      <>
      <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-96 h-full pt-16 duration-75 transition-width">
        <div className="pl-8 pt-8 pb-8 h-full overflow-y-auto	overflow-x-hidden">
          <Aside />
        </div>
      </aside>
      <div className="relative h-full overflow-y-auto ml-96">
        <div className="grid grid-cols-2 gap-4 text-left">
          <LeadTraining />
        </div>
      </div>
    </>)
}
  
export default Progress