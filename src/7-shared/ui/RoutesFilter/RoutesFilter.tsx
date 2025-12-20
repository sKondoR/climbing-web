import { useId } from 'react';
import { IChartSettings } from '../../types/chart.types';
import { Toggle } from '../Toggle';
import { GRADES_COLORS } from '../../constants/routes.constants';

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
      <div className="flex items-center mr-10">
        {['is5', 'is6', 'is7', 'is8', 'is9'].map((label: string) => {
          const isChecked = label in settings ? settings[label as keyof IChartSettings] : false;
          const color = GRADES_COLORS[`${label[2]}c`];
          return (
          <div className={`mr-1 w-5 h-5 rounded relative bg-gray-100 select-none`}
            style={{
              color,
              backgroundColor: `${settings[label as keyof IChartSettings] ? color : ''}`,
              borderColor: color
            }}
            key={label}
          >
            <input id={`${label}${prefix}`} type="checkbox" checked={isChecked} onChange={(e) => onChange(e, label)} className="hidden" />
            <label
              htmlFor={`${label}${prefix}`}
              className={`w-5 h-5 leading-none pt-[1px] cursor-pointer text-center font-bold absolute top-0 left-0
                ${isChecked ? 'text-white' : 'text-gray-400'}`}
            >
              {label[2]}
            </label>
          </div>);
        })}
        <div className="text-sm">категории</div>
        <div className="hidden">
          <div className="bg-sky-600"></div>
          <div className="bg-emerald-500"></div>
          <div className="bg-pink-500"></div>
          <div className="bg-yellow-500"></div>
          <div className="bg-purple-600"></div>
        </div>
      </div>
      <div className="grow">
        <Toggle
          checked={settings.isLead}
          onChange={(e) => onChange(e, 'isLead')}
          labels={['боулдеринг', 'трудность']}
        />
      </div>
      <div className="ml-10">
                  {/* <input id={`isTopRope${prefix}`} type="checkbox" checked={settings.isTopRope} onChange={(e) => onChange(e, 'isTopRope')} className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
        <label htmlFor={`isTopRope${prefix}`} className="ms-1 text-sm text-gray-900 whitespace-nowrap">с верхней</label> */}

        {showSort ? (
          <Toggle
            checked={settings.sortByCategory}
            onChange={(e) => onChange(e, 'sortByCategory')}
            labels={['по дате', 'по категории']}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RoutesFilter;