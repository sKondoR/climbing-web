import { useCallback, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
export type Option = string | number | Record<string, any>;

interface MultiselectDropdownProps {
  query: string;
  setQuery: (query: string) => void;
  filteredOptions: Option[],
  getOptionKey: (option: Option) => string;
  renderOption?: (option: Option) => React.ReactNode;
  selected?: string[];
  dropdownPlaceholder: string;
  addNewPlaceholder: string;
  onChange: (values: string[]) => void;
  isNewOption?: boolean,
}
const MultiselectDropdown = ({
  query = '',
  setQuery,
  filteredOptions = [],
  getOptionKey,
  renderOption = (option: Option): ReactNode => <>{option}</>,
  selected = [],
  dropdownPlaceholder,
  addNewPlaceholder,
  onChange,
  isNewOption,
}: MultiselectDropdownProps) => {

  // Выбор/удаление опции
  const handleOptionClick = useCallback((option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  }, [selected, onChange]);

  // Добавление новой опции (если creatable)
  const addNew = useCallback(() => {
    if (query.trim() && !selected.includes(query)) {
      onChange([...selected, query.trim()]);
      setQuery('');
    }
  }, [query, selected, onChange]);

  return (
    <>
      {isNewOption ? (
        <div
          className="px-3 py-1 cursor-pointer text-gray-800 hover:text-orange-500" 
          onClick={() => addNew()}
          aria-label={addNewPlaceholder}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="mr-2"                
          />
          {addNewPlaceholder}
        </div>
      ) : null}
      {dropdownPlaceholder ? (
        <div className="px-3 py-1">{dropdownPlaceholder}</div>
      ) : null}
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option: Option) => {
          const optionKey = getOptionKey(option)
          const isSelected = selected.includes(optionKey);
          return (
            <div
              key={optionKey}
              onClick={() => handleOptionClick(optionKey)}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-blue-gray-50 ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <div className="w-5">
                {isSelected  ? <FontAwesomeIcon
                  icon={faCheck}
                  className="cursor-pointer text-lime-500"
                /> : null}
              </div>
              <div className={isSelected ? 'font-medium' : ''}>{renderOption(option)}</div>
            </div>
          );
        })
      ) : (
        <div className="cursor-default px-3 py-2 text-sm text-gray-400">
          ничего не найдено
        </div>
      )}
    </>
  );
};

export default MultiselectDropdown;