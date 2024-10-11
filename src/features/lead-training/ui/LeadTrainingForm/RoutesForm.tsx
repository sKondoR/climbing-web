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
  
  const [routes, setRoutes] = useState('');
  const [withStops, setWithStops] = useState('');
  const [topRopes, setTopRopes] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);


  const existedTraining = trainings.find((d) => selectedDate && d.date === selectedDate)

  useEffect(() => {
    const existedTraining = trainings.find((d) => selectedDate && d.date === selectedDate)
    setRoutes((existedTraining?.routes || []).join(' '))
    setWithStops((existedTraining?.withStops || []).join(' '))
    setTopRopes((existedTraining?.topRopes || []).join(' '))
  }, [trainings, selectedDate])
  
  const submit = () => {
    setLeadTraining({
      id: existedTraining?.id,
      date: selectedDate,
      userId: user?.id || TEST_USER_ID, //hardcoded user id
      routes: routes ? routes.split(' ') : [],
      withStops: withStops ? withStops.split(' ') : [],
      topRopes: topRopes ? topRopes.split(' ') : [],
    })
    setOpenConfirm(false)
  };

  const handleDecline = () => setOpenConfirm(false)

  const handleConfirmOpen = () => {
    if (existedTraining && !(routes || withStops || topRopes)) {
      setOpenConfirm(true)
      return
    }
    submit()
  }

  const handleRemove = () => {
    setRoutes('')
    setWithStops('')
    setTopRopes('')
    setOpenConfirm(true)
  }

  return <>
    введите трассы через пробел
    <TextInput
      value={routes}
      disabled={!selectedDate}
      type="text"
      className="my-3"
      placeholder="с нижней страховкой"
      onChange={({ target: { value } }) => setRoutes(value)}
    />
    <TextInput
      value={withStops}
      disabled={!selectedDate}
      type="text"
      className="my-3"
      placeholder="с зависами"
      onChange={({ target: { value } }) => setWithStops(value)}
    />
    <TextInput
      value={topRopes}
      disabled={!selectedDate}
      type="text"
      className="my-3"
      placeholder="с верхней страховкой"
      onChange={({ target: { value } }) => setTopRopes(value)}
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

