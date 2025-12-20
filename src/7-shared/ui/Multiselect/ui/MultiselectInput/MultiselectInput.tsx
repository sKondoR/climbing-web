import { useCallback } from 'react';
import { Input } from '@material-tailwind/react';

export type Option = string | number | Record<string, any>;

interface MultiselectInputProps {
  query: string,
  setQuery: (query: string) => void;
  setOpen: (open: boolean) => void;
  selected: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
  isCreatable: boolean;
  // Optional regular expression to validate input on keydown
  // Example: /^[0-9]*$/ for digits only
  inputValidRegex?: RegExp;
  isNewOption: boolean,
}

const MultiselectInput = ({
  query,
  setQuery,
  setOpen,
  selected = [],
  placeholder = 'Выберите из списка',
  onChange,
  isCreatable = false,
  inputValidRegex,
  isNewOption,
}: MultiselectInputProps) => {
  // Обработчик ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  // Добавление новой опции (если creatable)
  const addNew = useCallback(() => {
    if (query.trim() && !selected.includes(query)) {
      onChange([...selected, query.trim()]);
      setQuery('');
    }
  }, [query, selected, onChange]);

  // Фокусировка ввода при открытии меню
  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNewOption && e.key === 'Enter') {
      addNew();
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }
    if (inputValidRegex) {
      const isValidInput = inputValidRegex.test(e.key);
      if (!isValidInput) {
        e.preventDefault();
      }
    }
  };

  return (
    <Input
      value={query}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      className={`w-full border-none bg-white/50 py-1 px-2 ${isCreatable ? 'pr-10' : ''}`}
      placeholder={placeholder}
      autoComplete="off"
      onKeyDown={handleKeyDown}
    />
  );
};

export default MultiselectInput;