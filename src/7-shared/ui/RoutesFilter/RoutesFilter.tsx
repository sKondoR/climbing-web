import { useId } from 'react';
import { IChartSettings } from '../../types/chart.types';
import { Toggle } from '../Toggle';

const RoutesFilter = ({
  settings,
  onSettingsChange,
  showSort = false
}: {
  settings: IChartSettings;
  onSettingsChange: (settings: IChartSettings) => void;
  showSort?: boolean;
}) => {
  const prefix = useId();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, prop: string): void => {
    onSettingsChange({
      ...settings,
      [prop]: e.target.checked,
    })
  }
  return (
    <div className="flex items-center justify-between max-w-[700px]">
      <div className="flex grow">
        <label className="inline-flex items-center cursor-pointer">
          <span className={`mr-1 text-sm font-medium ${settings.isLead ? 'text-gray-500' : 'text-gray-900'}`}>Боулдеринг</span>
          <input id={`isLead${prefix}`} type="checkbox" checked={settings.isLead} className="sr-only peer" onChange={(e) => onChange(e, 'isLead')} />
          <div className="relative w-11 h-6 bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          <span className={`ml-1 text-sm font-medium ${settings.isLead ? 'text-gray-900' : 'text-gray-500'}`}>Трудность</span>
        </label>
        {showSort ? (
          <div className="ml-10">
            {/* <input id={`isTopRope${prefix}`} type="checkbox" checked={settings.isTopRope} onChange={(e) => onChange(e, 'isTopRope')} className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
            <label htmlFor={`isTopRope${prefix}`} className="ms-1 text-sm text-gray-900 whitespace-nowrap">с верхней</label> */}

            <Toggle
              checked={settings.sortByCategory}
              onChange={(e) => onChange(e, 'sortByCategory')}
              labels={['по дате', 'по категории']}
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <div className="text-sm">категории</div>
        {['is5', 'is6', 'is7', 'is8', 'is9'].map((label: string) => {
          const isChecked = label in settings ? settings[label as keyof IChartSettings] : false;
          return (
          <div className={`ml-1 w-5 h-5 text-blue-500 ${settings[label as keyof IChartSettings] ? 'bg-blue-500 border-blue-500' : 'bg-gray-100 border-gray-500'} rounded focus:ring-blue-500 focus:ring-2 relative`}>
            <input id={`${label}${prefix}`} type="checkbox" checked={isChecked} onChange={(e) => onChange(e, label)} className="hidden" />
            <label htmlFor={`${label}${prefix}`} className={`w-5 h-5 leading-none pt-[1px] cursor-pointer text-center font-bold ${isChecked ? 'text-white' : 'text-gray-300'} absolute top-0 left-0`}>
              {label[2]}
            </label>
          </div>);
        })}
      </div>
    </div>
  );
}

export default RoutesFilter;