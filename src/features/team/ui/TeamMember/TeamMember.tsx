import { useTeamStore } from '../../team.store'

const TeamMember = () => {
  const {
    coaches,
    team,
    previewId,
  } = useTeamStore()
  
  const selected = [...coaches, ...team][previewId]
  
  if (!selected) return
  return (
    <>
      <h3>{selected.name}</h3>
    </>
  )
}
  
export default TeamMember
