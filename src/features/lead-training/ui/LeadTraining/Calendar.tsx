import { Datepicker, TextInput } from 'flowbite-react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import type { CustomFlowbiteTheme } from 'flowbite-react'

import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import calendarTheme from './calendar.theme'
import { ILeadTraining } from '../../lead-training.interfaces'

const customTheme: CustomFlowbiteTheme['datepicker'] = calendarTheme;

interface Props {
  data: ILeadTraining[];
  setData: (data: ILeadTraining) => void;
}

const FORMAT = 'DD-MM-YY';

const Calendar = ({ data, setData }: Props) => {
  const [value, setValue] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const now = moment(new Date()).format(FORMAT);
  const [calendarDate, setCalendarDate] = useState<string | undefined>(now);
  const [formattedDate, setFormattedDate] = useState<string | null>(now);

  const existedTraining = data.find((d) => formattedDate && d.date === formattedDate)

  useEffect(() => {
    const existedTraining = data.find((d) => formattedDate && d.date === formattedDate)
    setValue((existedTraining?.routes || []).join(' '))
  }, [data, formattedDate])
  
  const submit = () => {
    setData({
      id: existedTraining?.id,
      routes: value ? value.split(' ') : [],
      date: formattedDate,
      userId: undefined,
    })
    setOpenConfirm(false)
  };

  const handleDecline = () => setOpenConfirm(false)

  const handleConfirmOpen = () => {
    if (!value) {
      setOpenConfirm(true)
      return
    }
    submit()
  }

  const handleRemove = () => {
    setValue('')
    setOpenConfirm(true)
  }

  return <>
    Выбранная дата: {formattedDate}
    <Datepicker
      language="ru-RU"
      inline
      value={calendarDate}
      weekStart={1}
      showClearButton={false}
      showTodayButton={false}
      onSelectedDateChanged={(date: Date): void => {
        const val = moment(date).format(FORMAT);
        setCalendarDate(val);
        setFormattedDate(val);
      }}
      theme={customTheme}
    />
    <TextInput
      value={value}
      type="text"
      className="my-3"
      placeholder="введите трассы через пробел"
      onChange={({ target: { value } }) => {
        setValue(value);
      }}
    />
    <div className="flex justify-between">
      <button onClick={handleConfirmOpen}>Сохранить</button>
      {existedTraining && <button onClick={handleRemove}>Удалить</button>}
    </div>
    <ConfirmModal
      open={openConfirm}
      onConfirm={submit}
      onDecline={handleDecline}
      title="Данные о требировке будут удаленны"
    />
  </>
}

export default Calendar