import { Datepicker, TextInput } from 'flowbite-react'
import { useState } from 'react'
import moment from 'moment'
import { ILeadTrainingProps } from '../../lead-training.interfaces'

interface Props {
  data: ILeadTrainingProps[];
  setData: (data: ILeadTrainingProps) => void;
}

const Calendar = ({ data, setData }: Props) => {
  const [value, setValue] = useState('');
  // const [getDate, setDate] = useState(new Date().toISOString());

  const [formattedDate, setFormattedDate] = useState<string>('');

  const handleConfirm = () => {
    const existedTraining = data.find((d) => formattedDate && d.date === formattedDate)
    if (formattedDate) {
      setData({
        id: existedTraining?.id,
        routes: value.split(' '),
        date: formattedDate,
        userId: null,
      });
    } else {
      alert('Select date');
    }
  };
  return <>
    <Datepicker
      inline
      weekStart={1}
      onSelectedDateChanged={(date: Date): void => {
        setFormattedDate(moment(date).format('DD-MM-YY'));
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