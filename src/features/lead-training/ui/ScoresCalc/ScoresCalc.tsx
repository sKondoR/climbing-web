import { TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

import { useLeadTrainingStore } from '../../lead-training.store'
import { calcScores } from '../../lead-training.utils'
import useDebounce from '../../../../hooks/useDebounce'

const ScoresCalc = () => {
  const {
    scoreSettings,
    setScores,
    setScoreSettings,
  } = useLeadTrainingStore()

  const [coeffs, setCoeffs] = useState<number[]>(scoreSettings);
  const [debouncedValue] = useDebounce<number[]>(coeffs, 1000);

  useEffect(() => {
    if (typeof debouncedValue[0] === 'number' && typeof debouncedValue[1] === 'number') {
      setScoreSettings(debouncedValue)
      const newScores = calcScores(debouncedValue[0], debouncedValue[1])
      setScores(newScores)
    }
  }, [debouncedValue, setScoreSettings, setScores]);

  return <>
    <div>
      Вы можете поменять коэффициенты стоимости трасс<br />
      Баллы за трассу считаются по формуле: scores = с1 * x^2 + с2 * x + 1, где 1 стоимость трассы 6а
    </div>
    <div className="flex">
      <div className="mt-1 mr-1">c1: </div>
      <TextInput
        value={coeffs[0]}
        type="number"
        step={0.01}
        className=""
        placeholder="введите коэффициент с1"
        onChange={({ target: { value } }) => setCoeffs([parseFloat(value), coeffs[1]])}
      />
      <div className="mt-1 mr-1 ml-4">c2: </div>
      <TextInput
        value={coeffs[1]}
        type="number"
        step={0.01}
        className=""
        placeholder="введите коэффициент с2"
        onChange={({ target: { value } }) => setCoeffs([coeffs[0], parseFloat(value)])}
      />
    </div>
  </>
}

export default ScoresCalc
