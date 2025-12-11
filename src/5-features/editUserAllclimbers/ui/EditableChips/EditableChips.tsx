import {
  Chip,
} from '@material-tailwind/react';
import { ICustomAllClimber } from '../../../../6-entities/user/user.interfaces';
import EditableText from '../../../../7-shared/ui/EditableText/EditableText';

interface EditableChipsProps {
  options?: ICustomAllClimber[];
  className?: string;
  isCreatable?: boolean;
  onChange: (options: ICustomAllClimber[]) => void;
  onEdit: (options: ICustomAllClimber[]) => void;
}

const EditableChips = ({
  options = [],
  onChange,
  onEdit,
  className,
}: EditableChipsProps) => {

  const handleOnRemove = (allClimbId: number) => {
    onChange(
      options.filter((item) => item.allClimbId !== allClimbId)
    );
  };

  const handleOnEdit = (customName: string, allClimbId: number) => {
    onEdit(
      options.map((item) => ({
        ...item,
        customName: item.allClimbId === allClimbId ? customName : item.customName,
      }))
    );
  };

  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      {options.map((option) => {
        return (
        <Chip
          key={option.allClimbId}
          variant="ghost"
          className="group flex items-center px-2 py-1 text-sm border-slate-500 mb-1 mr-1"
        > 
          <EditableText
            value={option.customName || ''}
            onSave={(value: string) => handleOnEdit(value, option.allClimbId)}
            onRemove={() => handleOnRemove(option.allClimbId)}
            placeholder={option.allClimbId.toString()}
          >
            {option.customName || option.allClimbId.toString()}
          </EditableText>
        </Chip>
      )})}
    </div>
  );
};

export default EditableChips;