import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import Multiselect from '../../../../7-shared/ui/Multiselect/Multiselect';
import EditableChips from '../EditableChips/EditableChips';
import { useUserGroupsStore } from '../../userGroups.store';
import { IClimberGroup, ICustomAllClimber } from '../../../../6-entities/user/user.interfaces';
import EditableText from '../../../../7-shared/ui/EditableText/EditableText';

const EditUserGroups = () => {
  const { climbers } = useClimbersStore();
  const { groups, setUserGroups } = useUserGroupsStore();

  const climberOptions = Object.keys(climbers);

  const setGroupItems = (index: number, values: string[]) => {
      setUserGroups(groups.map((group, i) => ({
        ...group,
        items: index === i ? values.map((v: string) => ({ customName: '', allClimbId: Number(v) })) : group.items,
      })));
  };

  const setItems = (index: number, values: ICustomAllClimber[]) => {
    setUserGroups(groups.map((group, i) => ({
      ...group,
      items: index === i ? values : group.items,
    })));
  };

  const handleSave = (value: string, index: number) => {
    setUserGroups(groups.map((group, i) => ({
      ...group,
      name: index === i ? value : group.name,
    })));
  };

  const handleRemove = (index: number) => {
    setUserGroups(groups.filter((_group, i) => i !== index));
  };

  return (<>
    {groups.map(({ name, items }: IClimberGroup, i) => {
      return (
        <div key={name} className="pl-5 pr-5 pt-2 pb-2 bg-white/20 mb-[6px]">
          <div className="flex items-center justify-between">
            <div className="w-[60%] pr-5">
              <h2 className="text-xl mr-5 overflow-hidden">
              <EditableText
                value={name}
                onSave={(value: string) => handleSave(value, i)}
                onRemove={() => handleRemove(i)}
              >
                {name}
              </EditableText>
              </h2>
            </div>
            <div className="w-[40%] min-h-8 py-1 relative">
              <Multiselect
                selected={items.map(({ allClimbId }: ICustomAllClimber) => allClimbId.toString())}
                options={climberOptions}
                placeholder="выберите скалолазов"
                onChange={(values) => setGroupItems(i, values)}
                isHiddenSelected={true}
              />
            </div>
          </div>
          <EditableChips
            key={`${name}-selected`}
            options={items}
            onChange={(values) => setItems(i, values)}
            onEdit={(values) => setItems(i, values)}
          />
        </div>
      );
    })}
  </>)
}
  
export default EditUserGroups;