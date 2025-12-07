import { Table } from 'flowbite-react'
import moment from 'moment'
import { useElementSize } from '@custom-react-hooks/use-element-size';

import { WEEK, TIME } from '../../schedule.constants'
import { IEvent } from '../../schedule.interfaces'

export interface Props {
  schedule: IEvent[];
}

export interface ICellProps {
  isEvent: boolean | undefined | null;
  bg: string | undefined | null;
}

const getSeconds = (time: string) => moment(time, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');

const TIME_COL_WIDTH = 100;
const BORDER_HEIGHT = 1;

const Week = ({ schedule }: Props) => {
  const rowsCount = TIME.length + 1;
  const [setRef, size] = useElementSize()
  const cellWidth = (size.width - TIME_COL_WIDTH) / WEEK.length;
  const cellHeight = (size.height - BORDER_HEIGHT * TIME.length) / rowsCount;
  const yAxisHeight = size.height * TIME.length / rowsCount;
  const startTimeCoord = getSeconds(TIME[0])
  const finishTimeCoord = getSeconds(`${parseInt(TIME[TIME.length - 1], 10) + 1}`)

  return (
    <div ref={setRef} className="relative">
      {schedule.map(({ weekDay, place, fromTime, toTime, type }) => {
        const fromCoord = getSeconds(fromTime)
        const x0 = TIME_COL_WIDTH + WEEK.indexOf(weekDay) * cellWidth;
        const toCoord = getSeconds(toTime)
        const y0 = yAxisHeight * (fromCoord - startTimeCoord) / (finishTimeCoord - startTimeCoord)
        const height = yAxisHeight * (toCoord - fromCoord) / (finishTimeCoord - startTimeCoord)
        let bgClass = 'bg-blue-100';
        let typeText;
        if (type === 'BOULDER' || type === 'LEAD') {
          bgClass = 'bg-blue-400'
          typeText = type;
        }
        if (type === 'HOBBY') {
          bgClass = 'bg-green-100'
        }
        return (<div
          className={`flex items-center justify-center absolute z-10 ${bgClass}`}
          style={{
            width: `${cellWidth}px`,
            height: `${height}px`,
            left: `${x0}px`,
            top: `${cellHeight + y0}px`,
          }}
        >
          <div className="text-center">
            {fromTime} - {toTime}<br />
            {place}<br />{typeText}
          </div>
        </div>)
      })}
      <Table striped>
        <Table.Head>
          <Table.HeadCell key="-" className="px-6 py-3" style={{ width: `${TIME_COL_WIDTH}px` }}>
          </Table.HeadCell>
          {WEEK.map((day: string) => (
            <Table.HeadCell key={day} className="px-6 py-3 text-center" style={{ width: `${cellWidth}px` }}>
              {day}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {TIME.map((hour) => (
            <Table.Row className="bg-white" key={hour}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 px-3 py-0 text-xs align-top">{hour}</Table.Cell>
              {WEEK.map((day) => {
                return (
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 px-3 py-3 text-xs" key={day}>
                    &nbsp;
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Week