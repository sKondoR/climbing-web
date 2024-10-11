import { TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

import { useLeadTrainingStore } from '../../lead-training.store'
import { calcScores } from '../../lead-training.utils'
import useDebounce from '../../../../hooks/useDebounce'
import { DEFAULT_C1, DEFAULT_C2, DEFAULT_C3, DEFAULT_C4 } from '../../lead-training.constants';

const ScoresCalc = () => {
  const {
    scoreSettings,
    setScores,
    setScoreSettings,
  } = useLeadTrainingStore()

  const [coeffs, setCoeffs] = useState<number[]>(scoreSettings);
  const [debouncedValue] = useDebounce<number[]>(coeffs, 1000);
  const [c1, c2, c3, c4] = coeffs;

  useEffect(() => {
    if (debouncedValue.find((c) => typeof c !== 'number')) {
      setScoreSettings(debouncedValue)
      const newScores = calcScores(debouncedValue[0], debouncedValue[1])
      setScores(newScores)
    }
  }, [debouncedValue, setScoreSettings, setScores]);

  return <>
    <div className="mt-2">
      вы можете поменять коэффициенты стоимости трасс<br />
      базовые баллы за трассу считаются по формуле: scores = с1 * x^2 + с2 * x + 1<br />
      по-умолчанию c1 = {DEFAULT_C1}, c2 = {DEFAULT_C2}, с3 = {DEFAULT_C3} (трасса с зависом оцениваеться на {DEFAULT_C3} категорий ниже), с4 = {DEFAULT_C4} для верхней страховки<br />
      стоимость трассы 6а зафиксированна 1
    </div>
    <div className="flex">
      <div className="mt-1 mr-1">
        <div>c1: {DEFAULT_C1} по-умолчанию</div>
        <TextInput
          value={c1}
          type="number"
          step={0.01}
          className=""
          placeholder="введите коэффициент с1"
          onChange={({ target: { value } }) => setCoeffs([parseFloat(value), c2, c3, c4])}
        />
      </div>
      <div className="mt-1 mr-1 ml-4">
        <div>c2: {DEFAULT_C2} по-умолчанию</div>
        <TextInput
          value={c2}
          type="number"
          step={0.01}
          className=""
          placeholder="введите коэффициент с2"
          onChange={({ target: { value } }) => setCoeffs([c1, parseFloat(value), c3, c4])}
        />
      </div>
      <div className="mt-1 mr-1 ml-4">
        <div>c3: {DEFAULT_C3} с зависом оцениваеться на {DEFAULT_C3} категорий ниже</div>
        <TextInput
          value={c3}
          type="number"
          step={1}
          className=""
          placeholder="введите коэффициент с3"
          onChange={({ target: { value } }) => setCoeffs([c1, c2, parseFloat(value), c4])}
        />
      </div>
      <div className="mt-1 mr-1 ml-4">
        <div>c4: {DEFAULT_C4} коэффициент за верхнюю страховку</div>
        <TextInput
          value={c4}
          type="number"
          step={0.01}
          className=""
          placeholder="введите коэффициент с4"
          onChange={({ target: { value } }) => setCoeffs([c1, c2, c3, parseFloat(value)])}
        />
      </div>
    </div>
  </>
}

export default ScoresCalc
