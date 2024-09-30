import { Table } from "flowbite-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const time = [
  '8 - 9',
  '9 - 10',
  '10 - 11',
  '11 - 12',
  '12 - 13',
  '13 - 14',
  '14 - 15',
  '15 - 16',
  '16 - 17',
  '17 - 18',
  '18 - 19',
  '19 - 20',
  '20 - 21',
  '21 - 22',
];
const Week = () => {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell key="-">
          </Table.HeadCell>
          {days.map((day) => (
            <Table.HeadCell key={day}>
              {day}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {time.map((hour) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={hour}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{hour}</Table.Cell>
              {days.map((day) => (
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" key={day}></Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Week