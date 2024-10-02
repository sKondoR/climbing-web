import ClimberPreview from '../../features/climbers/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../features/climbers/ui/ClimbersChart/ClimbersChart'

const Climbers = () => {
  return (<>
    <div className="grid grid-cols-2 gap-4 text-left">
      <div className="bg-white p-4"><ClimberPreview /></div>
      <div className="bg-white p-4"><ClimbersChart /></div>
    </div>
  </>)
}
  
export default Climbers