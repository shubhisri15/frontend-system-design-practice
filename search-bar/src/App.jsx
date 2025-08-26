import { useState } from 'react'
import useDebounce from './useDebounce'
import './App.css'
import SnakeGame from './SnakeGame'

function App() {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setInput('')
  }

  const handleSearch = (val) => {
    console.log('Make api call with search values')
  }

  const debouncedSearch = useDebounce(handleSearch, 500)

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
          type='text' 
          placeholder='Type to search...' 
          value={input} 
          onChange={(e) => 
            {
              setInput(e.target.value)
              debouncedSearch(e.target.value)
            }}/>
        <button>Search</button>
      </form>
      <SnakeGame />
    </>
  )
}

export default App
