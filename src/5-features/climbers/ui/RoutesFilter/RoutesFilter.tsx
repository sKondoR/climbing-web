import { useId } from 'react';
import { IChartSettings } from '../../climbers.interfaces'

const RoutesFilter = ({
  settings,
  onSettingsChange,
}: {
  settings: IChartSettings,
  onSettingsChange: (settings: IChartSettings) => void,
}) => {
  const prefix = useId();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, prop: string): void => {
    onSettingsChange({
      ...settings,
      [prop]: e.target.checked,
    })
  }
  return (
    <div className="flex items-center mb-4">
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <span className={`mr-1 text-sm font-medium ${settings.isLead ? 'text-gray-300' : 'text-gray-900'}`}>Боулдеринг</span>
          <input id={`isLead${prefix}`} type="checkbox" checked={settings.isLead} className="sr-only peer" onChange={(e) => onChange(e, 'isLead')} />
          <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className={`ml-1 text-sm font-medium ${settings.isLead ? 'text-gray-900' : 'text-gray-300'}`}>Трудность</span>
        </label>
      </div>
      <div className="ml-10">
        <input id={`is6${prefix}`} type="checkbox" checked={settings.is6} onChange={(e) => onChange(e, 'is6')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor={`is6${prefix}`} className="ms-1 text-sm font-medium text-gray-900">6</label>
      </div>
      <div className="ml-3">
        <input id={`is7${prefix}`} type="checkbox" checked={settings.is7} onChange={(e) => onChange(e, 'is7')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor={`is7${prefix}`} className="ms-1 text-sm font-medium text-gray-900">7</label>
      </div>
      <div className="ml-3">
        <input id={`is8${prefix}`} type="checkbox" checked={settings.is8} onChange={(e) => onChange(e, 'is8')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor={`is8${prefix}`} className="ms-1 text-sm font-medium text-gray-900">8</label>
      </div>
      {settings.isLead && (
        <div className="ml-10">
        <input id={`isTopRope${prefix}`} type="checkbox" checked={settings.isTopRope} onChange={(e) => onChange(e, 'isTopRope')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor={`isTopRope${prefix}`} className="ms-1 text-sm font-medium text-gray-900 whitespace-nowrap">с верхней</label>
      </div>
      )}
    </div>
  );
}

export default RoutesFilter;