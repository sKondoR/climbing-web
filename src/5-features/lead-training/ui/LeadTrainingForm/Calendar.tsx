import { Datepicker } from 'flowbite-react'
import { useState } from 'react'
import moment from 'moment'
import type { CustomFlowbiteTheme } from 'flowbite-react'

import calendarTheme from './calendar.theme'
import { useLeadTrainingStore } from '../../../../6-entities/lead-training/lead-training.store'

const customTheme: CustomFlowbiteTheme['datepicker'] = calendarTheme;

const FORMAT = 'DD-MM-YY';

const Calendar = () => {
  const {
    selectedDate,
    setSelectedDate
  } = useLeadTrainingStore()
  const now = moment(new Date()).format(FORMAT);
  const [calendarDate, setCalendarDate] = useState<string | undefined>(now);

  const onSelectedDateChanged = (date: Date): void => {
    const val = moment(date).format(FORMAT);
    setCalendarDate(val);
    setSelectedDate(val);
  }

  return <>
    Выбранная дата: {selectedDate || '-'}
    <Datepicker
      language="ru-RU"
      inline
      value={calendarDate}
      weekStart={1}
      showClearButton={false}
      showTodayButton={false}
      onSelectedDateChanged={onSelectedDateChanged}
      theme={customTheme}
    />
  </>
}

export default Calendar