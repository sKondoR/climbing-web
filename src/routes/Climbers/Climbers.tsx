import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import ClimberPreview from '../../features/climbers/ui/ClimberPreview/ClimberPreview'
import ClimbersChart from '../../features/climbers/ui/ClimbersChart/ClimbersChart'

const Climbers = () => {
  return (<>
    <div><ClimbersTabs /></div>
    <div className="grid grid-cols-3 gap-4 text-left">
      <div><ClimberPreview /></div>
      <div><ClimbersChart /></div>
    </div>
  </>)
}
  
export default Climbers