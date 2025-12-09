import { useState } from 'react';
import {
  Input,
  Menu,
  Button,
} from '@material-tailwind/react';

interface AutocompleteProps {
  options: string[];
  placeholder?: string;
}

const Autocomplete = ({ options, placeholder }: AutocompleteProps) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  // Фильтрация опций с учётом поискового запроса
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true); // Открываем выпадающий список при вводе
  };

  const handleOptionClick = (value: string) => {
    setQuery(value);
    setOpen(false);
  };

  const handleInputClick = () => {
    if (filteredOptions.length > 0) {
      setOpen(!open);
    }
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-80 ml-5">
        <Input
            value={query}
            onChange={handleInputChange}
            onClick={handleInputClick}
            className="w-full"
            placeholder={placeholder}
        />
        <Menu open={open} placement="bottom-start">
            <Menu.Trigger
                as={Button}
                size="sm"
                className="flex items-center w-0 h-0 p-0 overflow-hidden"
                variant="ghost"
            >
            </Menu.Trigger>
            <Menu.Content
                modal={true}
                className="max-h-60 overflow-auto w-[200px] mt-1 z-50 w-80"
                onClick={handleMenuClose}
            >
            {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                <Menu.Item
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="hover:bg-blue-gray-50 cursor-pointer"
                >
                    {option}
                </Menu.Item>
                ))
            ) : (
                <Menu.Item disabled className="cursor-default">
                No results found
                </Menu.Item>
            )}
            </Menu.Content>
        </Menu>
    </div>
  );
};

export default Autocomplete;
