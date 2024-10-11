import { useLeadTrainingStore } from '../../lead-training.store'

const ScoresList = () => {
  const {
    scores,
  } = useLeadTrainingStore()

  const categories = Object.keys(scores);

  return <>
      Итого баллы:<br />
      {categories.map((cat: string) => <span className="mr-3" key={cat}>{cat}: {scores[cat]}</span>)}
  </>
}

export default ScoresList
