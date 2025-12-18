import { useMemo } from 'react';

import { useUserGroupsStore } from '../../../editUserAllclimbers/userGroups.store';
import { reorderGroupItemsByIds } from '../../../editUserAllclimbers/userGroups.utils';

import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import { IClimberGroup, ICustomAllClimber } from '../../../../6-entities/user/user.interfaces';
import { Multiselect } from '../../../../7-shared/ui/Multiselect';

interface SortableGroupProps {
  selected?: ICustomAllClimber[];
  index: number;
}

const AddAllclimberToGroupDropdown = ({
  selected = [],
  index,
}: SortableGroupProps) => {
  const { climbers } = useClimbersStore();
  const { groups, setUserGroups } = useUserGroupsStore();

  const climberOptions = Object.keys(climbers);
  const selectedOptions = useMemo(
    () => selected.map(({ allClimbId }: ICustomAllClimber) => allClimbId.toString()),
    [selected]
  );

  const setGroupItems = (index: number, idsArr: string[]) => {
    setUserGroups(groups.map((group: IClimberGroup, i: number): IClimberGroup => ({
      ...group,
      items: index === i ? reorderGroupItemsByIds(group.items, idsArr) : group.items,
    })));
  };

  return (
    <Multiselect
      selected={selectedOptions}
      options={climberOptions}
      placeholder="найти и добавить по allclimbId"
      onChange={(values) => setGroupItems(index, values)}
      isHiddenSelected
      isCreatable
      inputValidRegex={/^[0-9]*$/}
    />
  );
};
  
export default AddAllclimberToGroupDropdown;