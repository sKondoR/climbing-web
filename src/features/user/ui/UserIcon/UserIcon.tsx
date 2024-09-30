import { useUserStore } from '../../user.store'

const SRC = 'https://s3.eu-central-1.amazonaws.com/allclimb-eu/storage/avatars/43779db00408615735c9e9265422d03df9259a8f.jpg'
const UserIcon = () => {
  const { 
    user,
  } = useUserStore()

  return (
    <div>
      {user && <h3>User: {user.name}</h3>}
      <img src={SRC} alt="" />
    </div>
  )
}
  
export default UserIcon