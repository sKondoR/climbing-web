import { useState, useRef, useEffect } from 'react';
import {
  Input,
  Menu,
  Button,
  Chip,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface MultiselectProps {
  options: string[];
  placeholder?: string;
  className?: string;
}

const Multiselect = ({ options, placeholder = "Select options", className }: MultiselectProps) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Фильтрация опций с учётом поискового запроса
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  // Обработчик ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  // Выбор/удаление опции
  const handleOptionClick = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Удаление выбранной опции
  const removeSelected = (optionToRemove: string) => {
    setSelected((prev) => prev.filter((item) => item !== optionToRemove));
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

  return (
    <div className={className} ref={wrapperRef}>
      <div className="flex flex-wrap gap-1 min-h-8 py-1">
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-80"
          placeholder={selected.length === 0 ? placeholder : ''}
          aria-expanded={open}
          autoComplete="off"
        />
        {selected.map((option) => (
          <Chip
            key={option}
            variant="ghost"
            color="primary"
            className="flex items-center px-2 py-1 text-sm"
          >
            {option}
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer ml-1 h-3 w-3"
              onClick={() => removeSelected(option)}
              aria-label={`Remove ${option}`}
            />
          </Chip>
        ))}
      </div>
      <Menu open={open} placement="bottom-start">
        <Menu.Trigger
          as={Button}
          size="sm"
          className="flex items-center w-0 h-0 p-0 overflow-hidden absolute"
          variant="ghost"
          aria-label="Open options menu"
        />
        <Menu.Content
          className="max-h-60 overflow-auto w-80 mt-1 z-50 rounded-md shadow-lg bg-white"
          onClick={(e) => e.stopPropagation()}
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
                  <input checked={isSelected}
                    type="checkbox"
                    className="w-4 h-4 rounded-xs bg-neutral-secondary-medium"
                  />
                  <span className={isSelected ? 'font-medium' : ''}>{option}</span>
                </div>
              );
            })
          ) : (
            <Menu.Item disabled className="cursor-default px-3 py-2 text-sm text-gray-400">
              Нет результатов
            </Menu.Item>
          )}
        </Menu.Content>
      </Menu>
    </div>
  );
};

export default Multiselect;