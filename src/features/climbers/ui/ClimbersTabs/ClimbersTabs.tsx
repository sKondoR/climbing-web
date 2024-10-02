import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
// import { Tabs } from 'flowbite-react';
import { Sidebar } from "flowbite-react";

const ClimbersTabs = () => {
  const {
    climbers,
    climberPreviewId,
    setClimberPreviewId,
  } = useClimbersStore()
  const {
    user,
  } = useUserStore()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onActiveChange = (tabIndex: number) => {
    setClimberPreviewId(tabIndex);
  }

  return <Sidebar>
  <Sidebar.Items>
    <Sidebar.ItemGroup>
      <>
        {user?.climberIds?.map((id, index) => {
          if (!climbers[id]) return;
          return (
            <Sidebar.Item
              href="#"
              key={id}
              active={index === climberPreviewId}
              className="text-left"
              onClick={() => onActiveChange(index)}
            >
              {climbers[id].name}
            </Sidebar.Item>
          );
        })}
      </>
      {/* <Sidebar.Collapse label="E-commerce">
        <Sidebar.Item >Products</Sidebar.Item>
        <Sidebar.Item >Sales</Sidebar.Item>
        <Sidebar.Item >Refunds</Sidebar.Item>
        <Sidebar.Item >Shipping</Sidebar.Item>
      </Sidebar.Collapse> */}
    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>
  // return (<Tabs variant="pills" onActiveTabChange={onActiveTabChange} className="flex-column">
  //   {user?.climberIds?.map((id, tabIndex) => {
  //     if (!climbers[id]) return;
  //     return <Tabs.Item
  //       active={tabIndex === climberPreviewId}
  //       title={`${climbers[id].name}`}
  //       key={id}
  //       className="flex-row text-sm p-0.5">
  //     </Tabs.Item>
  //   })}
  // </Tabs>)
}
  
export default ClimbersTabs
