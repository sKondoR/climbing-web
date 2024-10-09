import moment from 'moment'
import { useState } from 'react'
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  // Tooltip,
  CartesianGrid
} from 'recharts'
// import CustomTooltip from './CustomTooltip'
import { ITrainingDay } from '../../lead-training.interfaces'
import { formatData } from './lead-training.utils'

// const Box = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const BtnBox = styled.div`
//   display: flex;
// `;

// const BtnDateUnit = styled.p`
//   color: green;
//   border-bottom: ${p => p.activeKey === p.getActiveKey && `1px solid green`};
//   cursor: pointer;
//   margin-right: 1rem;
//   &::last-of-type {
//     margin-right: 0;
//   }
// `;

const oneMonth = 30;
const threeMonths = 90;
const oneYear = 365;
const oneMonthStr = 'one-month'
const threeMonthsStr = 'three-months'
const oneYearStr = 'one-year'

interface Props {
  data: ITrainingDay[];
}


export const LeadTrainingChart = ({ data }: Props) => {
  const [getDateUnit, setDateUnit] = useState<number>(oneMonth);
  const [, setActiveKey] = useState<string>(oneMonthStr);

  const handleDateUnit = (days: number, activeKey: string) => () => {
    setActiveKey(activeKey);
    setDateUnit(days);
  };
  const handleOneMonth = handleDateUnit(oneMonth, oneMonthStr);
  const handleThreeMonths = handleDateUnit(threeMonths, threeMonthsStr);
  const handleOneYear = handleDateUnit(oneYear, oneYearStr);
  // Filter data
  const formattedData = formatData(data);
  const filteredData = formattedData.filter(({ time }) =>
    moment(time).isAfter(moment().subtract(getDateUnit, 'days'))
  );
  const sortedData = filteredData.sort((a, b) => b.time - a.time);

  const show = false;
  // JSX
  return (
    <div> {show && '<Box'}
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={unixTime => moment(unixTime).format("DD-MM-YY")}
            type="number"
          />
          <YAxis dataKey="value" name="Value" />
          <Scatter
            data={sortedData}
            line={{ stroke: "#d3d3d3" }}
            lineType="joint"
            lineJointType="monotoneX"
            name="Values"
          />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <CartesianGrid strokeDasharray="3 3" />
        </ScatterChart>
      </ResponsiveContainer>
      <div>{show && '<BtnBox'}
        <div
          // getActiveKey={getActiveKey}
          // activeKey={oneMonthStr}
          onClick={handleOneMonth}
        >{show && '<BtnDateUnit'}
          1M
        </div>
        <div
          // getActiveKey={getActiveKey}
          // activeKey={threeMonthsStr}
          onClick={handleThreeMonths}
        >
          3M
        </div>{show && '<BtnDateUnit'}
        <div
          // getActiveKey={getActiveKey}
          // activeKey={oneYearStr}
          onClick={handleOneYear}
        >
          1Y
        </div>{show && '<BtnDateUnit'}
      </div>
    </div>
  );
};
