import { useState, useId } from 'react'
import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { filterRoutes, getClimbersIds } from '../../climbers.utils'
import { IRoute, IChartSettings } from '../../climbers.interfaces'
import RoutesFilter from '../RoutesFilter/RoutesFilter'

const ClimbersTabs = () => {
  const prefix = useId();
  const {
    climbers,
    climberPreviewId,
  } = useClimbersStore()
  const {
    user,
    vkUser,
  } = useUserStore()
  const currentUser = vkUser || user;
  const [settings, setSettings] = useState({
    isLead: true,
    isTopRope: true,
    is6: false,
    is7: true,
    is8: true,
    sortByCategory: false,
  })

  if (!currentUser) return
  const ids = getClimbersIds(currentUser)
  const allClimbId = ids[climberPreviewId]
  if (!allClimbId) return
  const climber = climbers[allClimbId]
  if (!climber) return 'No data...'
  const { leads, boulders } = climber

  const onSettingsChange = (newSettings: IChartSettings) => setSettings(newSettings)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, prop: string): void => {
    onSettingsChange({
      ...settings,
      [prop]: e.target.checked,
    })
  }

  const allRoutes = settings.isLead ? leads : boulders
  const routes = filterRoutes(allRoutes, settings)
  return (
    <>
      <RoutesFilter settings={settings} onSettingsChange={onSettingsChange} />
      <div>
        <div className="flex">
          <h2 className="font-bold">{`${settings.isLead ? 'Трудность' : 'Боулдеринг'} (${routes.length}/${allRoutes.length})`}</h2>
          <label className="inline-flex items-center cursor-pointer ml-3">
            <span className={`mr-1 text-sm font-medium ${settings.sortByCategory ? 'text-gray-300' : 'text-gray-900'}`}>по дате</span>
            <input id={`sortByCategory${prefix}`} type="checkbox" checked={settings.sortByCategory} className="sr-only peer" onChange={(e) => onChange(e, 'sortByCategory')} />
            <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className={`ml-1 text-sm font-medium ${settings.sortByCategory ? 'text-gray-900' : 'text-gray-300'}`}>по категории</span>
          </label>
        </div>
        {routes?.map((route: IRoute) => {
          return <div key={`${route.isBoulder}${route.grade}${route.name}`}>{route.grade} - {route.name} {route.isTopRope ? '(верхняя)' : ''}</div>
        })}
      </div>
    </>
  )
}
  
export default ClimbersTabs
