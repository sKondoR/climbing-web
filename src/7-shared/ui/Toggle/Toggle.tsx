import { useId } from 'react';

const Toggle = ({
  checked,
  onChange,
  labels = ['false', 'true'],
}: {
  checked: boolean, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  labels: string[]
}) => {
  const prefix = useId();
  return (
    <label className="inline-flex items-center cursor-pointer ml-3">
      <span className={`mr-1 text-sm font-medium ${checked ? 'text-gray-500' : 'text-gray-900'}`}>{labels[0]}</span>
      <input id={`sortByCategory${prefix}`} type="checkbox" checked={checked} className="sr-only peer" onChange={onChange} />
      <div className="relative w-9 h-5 bg-blue-500 peer-focus:outline-none
          peer-focus:ring-3 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
          rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
          after:absolute after:top-[2px] after:start-[2px] after:bg-white
          after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4
          after:transition-all peer-checked:bg-blue-500"></div>
      <span className={`ml-1 text-sm font-medium ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{labels[1]}</span>
    </label>
  );
}

export default Toggle;