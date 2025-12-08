import moment from 'moment';

export interface ICustomTooltip {
  active: number;
  payload: [{ value: number }, { value: number }];
}

const CustomTooltip = ({ active, payload }: ICustomTooltip) => {
  const [time, value] = payload;
  if (active) {
    return (
      <div className="custom-tooltip">
        <p>Rainfall: {value.value}</p>
        <p>Date: {moment(time.value).format("DD-MM-YY")}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
