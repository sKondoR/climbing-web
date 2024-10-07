import { useUserStore } from '../../user.store'

const UserIcon = () => {
  const { 
    vkUser,
  } = useUserStore()

  if (!vkUser) return;

  return (
    <div>
      {vkUser && <h3>vkUser: {vkUser.name}</h3>}
      <img src= {vkUser.avatar_url as string} alt="" />
    </div>
  )
}
  
export default UserIcon