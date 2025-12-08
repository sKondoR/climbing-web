import { useLeadTrainingStore } from '../../../../6-entities/lead-training/lead-training.store'

const ScoresList = () => {
  const {
    scores,
  } = useLeadTrainingStore()

  const categories = Object.keys(scores);

  return <>
      базовые баллы за пролаз с нижней страховкой<br />
      {categories.map((cat: string) => <span className="mr-3" key={cat}>{cat}: {scores[cat]}</span>)}
  </>
}

export default ScoresList
