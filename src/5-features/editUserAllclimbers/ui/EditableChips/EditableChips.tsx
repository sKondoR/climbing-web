import {
  Chip,
} from '@material-tailwind/react';
import { ICustomAllClimber } from '../../../../6-entities/user/user.interfaces';
import EditableText from '../../../../7-shared/ui/EditableText/EditableText';
import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';

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
  const { climbers } = useClimbersStore();  
  const climberOptions = Object.keys(climbers);

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
        const isNotLoadedClimber = !climberOptions.includes(`${option.allClimbId}`);
        const existedClimber = climbers[option.allClimbId];
        const name = option.customName || existedClimber?.name || '';
        return (
        <div
          key={option.allClimbId}
          className={`group flex items-center px-2 py-1 text-sm mb-1 mr-1 rounded-md
            ${isNotLoadedClimber ? 'bg-amber-300 border-amber-500' : 'bg-lime-300 border-lime-500'}
          `}
          title={isNotLoadedClimber ? 'новый' : `allclimbId: ${option.allClimbId}`}
        > 
          <EditableText
            value={name}
            onSave={(value: string) => handleOnEdit(value, option.allClimbId)}
            onRemove={() => handleOnRemove(option.allClimbId)}
            placeholder={option.allClimbId.toString()}
          >
            {name ||  `${option.allClimbId}/новый` }
          </EditableText>
        </div>
      )})}
    </div>
  );
};

export default EditableChips;