import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import {
  Menu,
  Button,
} from '@material-tailwind/react';
import EditableChips from './ui/EditableChips/EditableChips';
import MultiselectDropdown from './ui/MultiselectDropdown/MultiselectDropdown';
import MultiselectInput from './ui/MultiselectInput/MultiselectInput';

export type Option = string | number | Record<string, any>;

interface MultiselectProps {
  options?: Option[];
  optionKey?: string;
  renderOption?: (option: Option) => React.ReactNode;
  selected?: string[];
  placeholder?: string;
  dropdownPlaceholder?: string;
  addNewPlaceholder?: string;
  className?: string;
  isCreatable?: boolean;
  isHiddenSelected?: boolean;
  onChange: (values: string[]) => void;
  // Optional regular expression to validate input on keydown
  // Example: /^[0-9]*$/ for digits only
  inputValidRegex?: RegExp;
}

const isRecord = (obj: any): obj is Record<string, any> => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

const Multiselect = ({
  options = [],
  optionKey,
  renderOption = (option: Option): ReactNode => <>{option}</>,
  placeholder = 'Выберите из списка',
  dropdownPlaceholder = '',
  addNewPlaceholder = 'Добавить новое',
  selected = [],
  onChange,
  className = '',
  isCreatable = false,
  isHiddenSelected = false,
  inputValidRegex,

}: MultiselectProps) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const getOptionKey = (option: Option) => optionKey && isRecord(option) ? option[optionKey] : option;
  const dropdownOptions = options.map(getOptionKey);

  // Фильтрация опций с учётом поискового запроса
  const filteredOptions = options?.filter((option) =>
    getOptionKey(option).toLowerCase().includes(query.toLowerCase())
  ) || [];

  const isNewOption = isCreatable && !!query.trim().length && !dropdownOptions?.includes(query.trim());

  // Удаление выбранной опции
  const removeSelected = useCallback((values: string[]) => {
    onChange(values);
  }, [onChange]);

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) && 
        (menuRef.current && !menuRef.current.contains(event.target as Node))
      ) {
        setOpen(false);
        setQuery('');
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);


  const stopPropagation = (e: React.MouseEvent) => {
    e?.stopPropagation();
  };

  return (
    <div className={className} ref={wrapperRef}>
      <div className="flex flex-wrap relative">
        <MultiselectInput
          query={query}
          setQuery={setQuery}
          setOpen={setOpen}
          selected={selected}
          placeholder={placeholder}
          onChange={onChange}
          isCreatable={isCreatable}
          inputValidRegex={inputValidRegex}
          isNewOption={isNewOption}
        />
      </div>
      {isHiddenSelected ? null : selected.map((option) => (
        <EditableChips
          key={option}
          options={selected}
          onChange={removeSelected}
        />
      ))}
      {dropdownOptions.length ? <Menu open={open} placement="bottom-start">
        <Menu.Trigger
          as={Button}
          size="sm"
          className="flex items-center w-0 h-0 p-0 overflow-hidden absolute"
          variant="ghost"
          aria-label="Open options menu"
        />
        <Menu.Content
          className="max-h-60 overflow-auto w-80 mt-1 z-50 rounded-md shadow-lg bg-white"
          onClick={stopPropagation}
          ref={menuRef}
        > 
          <MultiselectDropdown
            query={query}
            setQuery={setQuery}
            filteredOptions={filteredOptions}
            getOptionKey={getOptionKey}
            renderOption={renderOption}
            selected={selected}
            dropdownPlaceholder={dropdownPlaceholder}
            addNewPlaceholder={addNewPlaceholder}
            onChange={onChange}
            isNewOption={isNewOption}
          />
        </Menu.Content>
      </Menu> : null}
    </div>
  );
};

export default Multiselect;