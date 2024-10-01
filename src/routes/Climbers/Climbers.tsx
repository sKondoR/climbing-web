import ClimbersTabs from '../../features/climbers/ui/ClimbersTabs/ClimbersTabs'
import ClimbersChart from '../../features/climbers/ui/ClimbersChart/ClimbersChart'

const Climbers = () => {
  return (<>
    <div className="grid grid-cols-3 gap-4 text-left">
      <div><ClimbersTabs /></div>
      <div><ClimbersChart /></div>
    </div>
  </>)
}
  
export default Climbers