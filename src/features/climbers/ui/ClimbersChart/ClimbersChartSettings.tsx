import { IChartSettings } from '../../climbers.interfaces'

const ClimbersChartSettings = ({
  settings,
  onSettingsChange,
}: {
  settings: IChartSettings,
  onSettingsChange: (settings: IChartSettings) => void,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onSettingsChange({
      ...settings,
      [e.target.id]: e.target.checked,
    })
  }
  return (
    <div className="flex items-center mb-4">
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-sm font-medium text-gray-900">Боулдеринг</span>
          <input id="isLead" type="checkbox" checked={settings.isLead} className="sr-only peer" onChange={onChange} />
          <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-2 text-sm font-medium text-gray-900">Трудность</span>
        </label>
      </div>
      <div className="ml-10">
        <input id="is6" type="checkbox" checked={settings.is6} onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor="is6" className="ms-2 text-sm font-medium text-gray-900">6a-6c</label>
      </div>
      <div className="ml-5">
        <input id="is7" type="checkbox" checked={settings.is7} onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor="is7" className="ms-2 text-sm font-medium text-gray-900">7a-7c</label>
      </div>
      <div className="ml-5">
        <input id="is8" type="checkbox" checked={settings.is8} onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor="is8" className="ms-2 text-sm font-medium text-gray-900">8a-8c</label>
      </div>
    </div>
  );
}

export default ClimbersChartSettings;