import { Datepicker, TextInput } from 'flowbite-react'
import { useState } from 'react'
import moment from 'moment'
import { ILeadTrainingProps, IFormattedDate } from '../../lead-training.interfaces'

interface Props {
  data: ILeadTrainingProps[];
  setData: (data: ILeadTrainingProps) => void;
}

const Calendar = ({ data, setData }: Props) => {
  const [value, setValue] = useState('');
  // const [getDate, setDate] = useState(new Date().toISOString());

  console.log(data);
  const [formattedDate, setFormattedDate] = useState<IFormattedDate>({ day: '', month: '', year: '' });

  const { day, month, year } = formattedDate;

  const handleConfirm = () => {
    if (day && month && year) {
      setData({ routes: value.split(' '), day, month, year, userId: null });
    } else {
      alert('Select date');
    }
  };
  return <>
    <Datepicker
      inline
      onSelectedDateChanged={(date: Date): void => {
        // setDate(date);
        const formatDate = moment(date).format('DD-MM-YY');
        const [day, month, year] = formatDate.split('-');
        setFormattedDate({ day, month, year });
      }}
      />
    <TextInput
      value={value}
      type="text"
      style={{ width: "auto", margin: "1rem 2rem" }}
      onChange={({ target: { value } }) => {
        setValue(value);
      }}
    />
    <button onClick={handleConfirm}>Confirm</button>
  </>
}

export default Calendar