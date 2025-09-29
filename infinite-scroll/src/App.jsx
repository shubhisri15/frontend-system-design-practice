import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {

    function handleScroll () {
      if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    getUserData(page)
  }, [page])

  async function getUserData (page) {
    const response = await fetch(`https://randomuser.me/api/?page=${page}&results=20&seed=infinite`)
    const data = await response.json()
    setData(prev => [...prev, ...data.results])
    console.log(data)
  }

  const dataDisplay = data.map(result => <div key={result.cell}>{result.email}</div>)
  

  return (
    <>
      <div className='container'>
        {dataDisplay}
      </div>
    </>
  )
}

export default App
