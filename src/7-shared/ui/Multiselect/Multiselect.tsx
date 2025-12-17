import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Input,
  Menu,
  Button,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import EditableChips from './ui/EditableChips/EditableChips';

interface MultiselectProps {
  options?: string[] | null;
  selected?: string[];
  placeholder?: string;
  className?: string;
  isCreatable?: boolean;
  isHiddenSelected?: boolean;
  onChange: (values: string[]) => void;
  // Optional regular expression to validate input on keydown
  // Example: /^[0-9]*$/ for digits only
  inputValidRegex?: RegExp;
}

const Multiselect = ({
  options = null,
  placeholder = 'Выберите из списка',
  selected = [],
  onChange,
  className,
  isCreatable = false,
  isHiddenSelected = false,
  inputValidRegex,

}: MultiselectProps) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Фильтрация опций с учётом поискового запроса
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  ) || [];

  // Обработчик ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

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
        setQuery(''); // Сброс поискового запроса при закрытии
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Фокусировка ввода при открытии меню
  const handleInputFocus = () => {
    setOpen(true);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e?.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (inputValidRegex) {
    const isValidInput = inputValidRegex.test(e.key);
    if (!isValidInput) {
      e.preventDefault();
    }
  }
};

  return (
    <div className={className} ref={wrapperRef}>
      <div className="flex flex-wrap relative">
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={`w-full border-none bg-white/40 py-1 px-2 ${isCreatable ? 'pr-10' : ''}`}
          placeholder={placeholder}
          aria-expanded={open}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
      </div>
      {isHiddenSelected ? null : selected.map((option) => (
        <EditableChips
          key={option}
          options={selected}
          onChange={removeSelected}
        />
      ))}
      {options !== null ? <Menu open={open} placement="bottom-start">
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
          {isCreatable && query.length && !options.includes(query) ? (
            <div
              className="px-3 py-2 cursor-pointer text-gray-800 hover:text-orange-500" 
              onClick={() => addNew()}
              aria-label="добавить новое"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-2"                
              />
              добавить новое
            </div>
          ) : null}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => handleOptionClick(option)}
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
                  <div className={isSelected ? 'font-medium' : ''}>{option}</div>
                </div>
              );
            })
          ) : (
            <div className="cursor-default px-3 py-2 text-sm text-gray-400">
              ничего не найдено
            </div>
          )}
        </Menu.Content>
      </Menu> : null}
    </div>
  );
};

export default Multiselect;