import './userStyles.css'

const UserDetails = ({user}) => {
  return (
    <div>
        {user.image ? <img src={user?.image} alt={`Photo of ${user?.firstName} ${user?.lastName}`}/> : <></>}
        <h1>{user.firstName} {user.lastName}</h1>
        <p>Email: {user.email}</p>
        <p>Contact number: {user.phone}</p>
        
        <button>Edit user</button>
        <button>Delete user</button>
    </div>
  )
}

export default UserDetails