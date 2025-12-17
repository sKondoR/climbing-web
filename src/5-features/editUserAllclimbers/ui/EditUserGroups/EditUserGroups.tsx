import { useClimbersStore } from '../../../../6-entities/allclimber/climbers.store';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import {CSS} from '@dnd-kit/utilities';

import Multiselect from '../../../../7-shared/ui/Multiselect/Multiselect';
import EditableChips from '../EditableChips/EditableChips';
import { useUserGroupsStore } from '../../userGroups.store';
import { IClimberGroup, ICustomAllClimber } from '../../../../6-entities/user/user.interfaces';
import EditableText from '../../../../7-shared/ui/EditableText/EditableText';

interface SortableGroupProps {
  id: string;
  name?: string;
  items?: ICustomAllClimber[];
  index: number;
}

const SortableGroup = ({
  id,
  name = '',
  items = [],
  index,
}: SortableGroupProps) => {
  const { climbers } = useClimbersStore();
  const { groups, setUserGroups } = useUserGroupsStore();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  return (
    <div
      className="pl-5 pr-5 pt-2 pb-2 bg-white/20 mb-[6px]"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="flex items-top justify-between">
        <div
          //{...listeners}
          className="w-6 cursor-pointer pr-1 py-1"
          title="изменить порядок групп"
        >
          <FontAwesomeIcon
            icon={faSort}
            className=""
          />
        </div>
        <div className="w-[60%] pr-5">
          <h2 className="text-xl mr-5 overflow-hidden">
            <EditableText
              value={name}
              onSave={(value: string) => handleSave(value, index)}
              onRemove={() => handleRemove(index)}
              inputClassName="text-xl"
              iconClassName="text-xl"
            >
              {name}
            </EditableText>
          </h2>
        </div>
        <div className="w-[40%] relative">
          <Multiselect
            selected={items.map(({ allClimbId }: ICustomAllClimber) => allClimbId.toString())}
            options={climberOptions}
            placeholder="найти и добавить по allclimbId"
            onChange={(values) => setGroupItems(index, values)}
            isHiddenSelected
            isCreatable
            inputValidRegex={/^[0-9]*$/}
          />
        </div>
      </div>
      <EditableChips
        key={`${name}-selected`}
        options={items}
        onChange={(values) => setItems(index, values)}
        onEdit={(values) => setItems(index, values)}
      />
    </div>
  );
};

const EditUserGroups = () => {
  const { groups, setUserGroups } = useUserGroupsStore();
  
  const pointerSensor = useSensor(
    PointerSensor, 
    {
      activationConstraint: {
        // убирает проблему на клики внутри элемента
        delay: 100,
        tolerance: 5,
        distance: 10,
      },
    }
  );
  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log('handleDragEnd');
    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = groups.findIndex((group) => group.id === active.id);
      const newIndex = groups.findIndex((group) => group.id === over.id);
      const newGroups = arrayMove(groups, oldIndex, newIndex);
      setUserGroups(newGroups);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={groups}
        strategy={verticalListSortingStrategy}
      >
        {groups.map(({ id, name, items }: IClimberGroup, index: number) => (
          <SortableGroup
            id={id}
            key={id}
            name={name}
            items={items}
            index={index}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
  
export default EditUserGroups;