import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';

interface EditableChipsItemProps {
  value: string;
  onSave: (value: string) => void;
  onRemove: () => void;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  placeholder?: string;
  children?: React.ReactNode | string;
}

const EditableText = ({
  value = '',
  onSave,
  onRemove,
  className = '',
  inputClassName = '',
  iconClassName = '',
  children,
}: EditableChipsItemProps) => {
  const [text, setText] = useState(value);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useLayoutEffect(() => {
    if (isEdit) {
      inputRef.current?.focus(); 
    }
  }, [isEdit]);

  const handleEditClick = (_e: React.MouseEvent<SVGSVGElement>) => {
    setIsEdit(true);
  };

  const handleSaveClick = (_e?: React.MouseEvent<SVGSVGElement>) => {
    onSave(text);
    setIsEdit(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleRemoveClick = (_e: React.MouseEvent<SVGSVGElement>) => {
    onRemove();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    } else if (e.key === 'Escape') {
      setText(value);
      setIsEdit(false);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {isEdit ?
        <input
          type="text"
          name="editable"
          ref={inputRef}
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`text-sm w-fix min-w-10 px-[1px] py-0
            bg-white/30 rounded-none border-[0] focus:border-[0] shadow-none focus:shadow-none
            ${inputClassName}`}
          placeholder={text}
        />
        : children
      }
      {/* Иконка редактирования */}
      {!isEdit ? <FontAwesomeIcon
        icon={faPencil}
        className={`cursor-pointer hover:text-orange-500 ml-1 h-3 w-3 ${iconClassName}`}
        onClick={handleEditClick}
        aria-label={`Edit ${text}`}
      /> : null}
      {/* Иконка сохранения */}
      {isEdit ? <FontAwesomeIcon
        icon={faSave}
        className={`cursor-pointer hover:text-orange-500 ml-1 h-3 w-3 ${iconClassName} ${isEdit ? 'block' : 'hidden'}`}
        onClick={handleSaveClick}
        aria-label={`Save ${text}`}
      /> : null}
      {/* Иконка удаления */}
      <FontAwesomeIcon
        icon={faTimes}
        className={`cursor-pointer hover:text-orange-500 ml-1 h-3 w-3 ${iconClassName}`} 
        onClick={handleRemoveClick}
        aria-label={`Remove ${text}`}
      />
    </div>
  );
};

export default EditableText;