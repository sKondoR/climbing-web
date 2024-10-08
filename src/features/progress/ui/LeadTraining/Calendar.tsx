import { Datepicker, TextInput } from 'flowbite-react'
import { useState } from 'react'
import moment from 'moment'
import { ITrainingDay, IFormattedDate } from './lead-training.interfaces'

interface Props {
  data: ITrainingDay[];
  setData: (data:ITrainingDay[]) => void;
}

const Calendar = ({ data, setData }: Props) => {
  const [amount, setAmount] = useState(0);
  // const [getDate, setDate] = useState(new Date().toISOString());
  const [formattedDate, setFormattedDate] = useState<IFormattedDate>({ day: '', month: '', year: '' });

  const { day, month, year } = formattedDate;

  const handleConfirm = () => {
    if (day && month && year) {
      setData([
        ...data,
        { amount, day, month, year }
      ]);
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
      value={amount}
      type="number"
      style={{ width: "auto", margin: "1rem 2rem" }}
      onChange={({ target: { value } }) => {
        setAmount(parseInt(value, 10));
      }}
    />
    <button onClick={handleConfirm}>Confirm</button>
  </>
}

export default Calendar