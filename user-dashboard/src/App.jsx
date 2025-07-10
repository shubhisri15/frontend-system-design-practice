import { useState, useEffect } from 'react'
import './App.css'
import Pagination from './components/Pagination';
import UserDetails from './components/UserDetails';
import UserTile from './components/UserTile';

const USERS_PER_PAGE = 6;

function App() {

  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(userData[0])
  const [currentPage, setCurrentPage] = useState(0)
 
  const getAllUsers = async () => {
    const response = await fetch('https://dummyjson.com/users')
    const data = await response.json()
    setUserData(data?.users)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const numberOfPages = Math.ceil(userData.length / USERS_PER_PAGE)

  return (
      <main>
        <h1>User dashboard</h1>
        <div className='user-dashboard'>
          <section className='users'>
            {userData?.slice(currentPage, currentPage + USERS_PER_PAGE).map(
              user => <UserTile key={user.id} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            )}
            <Pagination numberOfPages={numberOfPages} setCurrentPage={setCurrentPage}/>
          </section>
          <section className='user-details'>
            {selectedUser && <UserDetails user={selectedUser} />}
          </section>
        </div>
      </main>
  )
}

export default App
