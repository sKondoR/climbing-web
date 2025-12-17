import {
  Chip,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface EditableChipsProps {
  options?: string[];
  className?: string;
  isCreatable?: boolean;
  onChange: (options: string[]) => void;
}

interface EditableChipsItemProps {
  option: string;
  onRemove: (option: string) => void;
}


const EditableChipsItem = ({
  option,
  onRemove,
}: EditableChipsItemProps) => {
  const handleRemoveClick = (_e: React.MouseEvent<SVGSVGElement>) => {
    onRemove(option);
  };

  return (
    <Chip
      key={option}
      variant="ghost"
      className="group flex items-center px-2 py-1 text-sm border-slate-500 mb-1 mr-1"
    >
      {option}
      <FontAwesomeIcon
        icon={faTimes}
        className="cursor-pointer hover:text-orange-500 ml-1 h-3 w-3 hidden group-hover:block" 
        onClick={handleRemoveClick}
        aria-label={`Remove ${option}`}
      />
    </Chip>
  );
};

const EditableChips = ({
  options = [],
  onChange,
  className = '',
}: EditableChipsProps) => {

  const handleOnRemove = (option: string) => {
    onChange(
      options.filter((item) => item !== option)
    );
  };

  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      {options.map((option) => (
        <EditableChipsItem
          option={option}
          key={option}
          onRemove={handleOnRemove}
        />
      ))}
    </div>
  );
};

export default EditableChips;