const UserTile = ({ user, selectedUser, setSelectedUser }) => {
  return (
    <section className={`user-tile ${user === selectedUser ? 'selected' : ''}`} onClick={() => setSelectedUser(user)}>
        <h2>{user.firstName} {user.lastName}</h2>
        <p>Email: {user.email}</p>
    </section>
  )
}

export default UserTile