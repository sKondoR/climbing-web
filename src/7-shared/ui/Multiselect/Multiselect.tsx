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
}

const Multiselect = ({
  options = null,
  placeholder = 'Select options',
  selected = [],
  onChange,
  className,
  isCreatable = false,
  isHiddenSelected = false,
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
  const handleOptionClick = (option: string) => {
    onChange(
      selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]
    );
  };

  const addNew = useCallback(() => {
    onChange(
      selected.includes(query) ? selected : [...selected, query]
    );
    setQuery('');
  }, [query]);

  // Удаление выбранной опции
  const removeSelected = (values: string[]) => {
    onChange(values);
  };

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

  return (
    <div className={className} ref={wrapperRef}>
      <div className="flex flex-wrap gap-1 min-h-8 py-1 relative">
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={`w-full border-none bg-white/40 py-1 px-2 ${isCreatable ? 'pr-10' : ''}`}
          placeholder={placeholder}
          aria-expanded={open}
          autoComplete="off"
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
            <Menu.Item disabled className="cursor-default px-3 py-2 text-sm text-gray-400">
              Нет результатов
            </Menu.Item>
          )}
          {isCreatable && query.length && !options.includes(query) ? (
            <>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-xl text-gray-800 hover:text-orange-500 absolute top-3 right-3 mt-[2px]"
              onClick={() => addNew()}
              aria-label="Найти на AllClimb и добавить"
            />
              Найти на AllClimb и добавить
            </>
          ) : null}
        </Menu.Content>
      </Menu> : null}
    </div>
  );
};

export default Multiselect;