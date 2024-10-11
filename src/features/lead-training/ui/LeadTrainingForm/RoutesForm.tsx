import { TextInput } from 'flowbite-react'
import { useState, useEffect } from 'react'

import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import { useLeadTrainingStore } from '../../lead-training.store'
import { useUserStore } from '../../../user/user.store';

const TEST_USER_ID = 1;

const RoutesForm = () => {
  const { user } = useUserStore()
  const {
    selectedDate,
    trainings,
    setLeadTraining,
  } = useLeadTrainingStore()
  
  const [value, setValue] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);


  const existedTraining = trainings.find((d) => selectedDate && d.date === selectedDate)

  useEffect(() => {
    const existedTraining = trainings.find((d) => selectedDate && d.date === selectedDate)
    setValue((existedTraining?.routes || []).join(' '))
  }, [trainings, selectedDate])
  
  const submit = () => {
    setLeadTraining({
      id: existedTraining?.id,
      date: selectedDate,
      userId: user?.id || TEST_USER_ID, //hardcoded user id
      routes: value ? value.split(' ') : [],
    })
    setOpenConfirm(false)
  };

  const handleDecline = () => setOpenConfirm(false)

  const handleConfirmOpen = () => {
    if (existedTraining && !value) {
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
    <TextInput
      value={value}
      disabled={!selectedDate}
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
      title="Удалить тренировку?"
    />
  </>
}

export default RoutesForm

