import { useState } from 'react'
import './App.css'

const generateRandomId = (length = 9) => {
  return Math.random().toString(36).substring(2, 2 + length);
}

const TodoItem = ({ todoItem, setTodoList }) => {

  const [editing, setEditing] = useState(false)
  const [editedTodo, setEditedTodo] = useState(todoItem.value)

  const handleTodoState = () => {
    setTodoList(prev => prev.map(item => item.id === todoItem.id ? {...item, completed: !item.completed} : item))
  }

  const handleDelete = () => {
    setTodoList(prev => prev.filter(item => item.id !== todoItem.id))
  }

  const handleEdit = () => {
    if (!editedTodo.trim()) {
      setEditing(false)
      return
    }
    setTodoList(prev => prev.map(item => item.id === todoItem.id ? {...item, value: editedTodo} : item))
    setEditing(false)
  }

  return <div className='todo-item'>
            <input type='checkbox' checked={todoItem.completed} disabled={editing} onChange={handleTodoState}/>
            {editing ? 
                <>
                  <input type='text' default={todoItem.value} value={editedTodo} onChange={(e) => setEditedTodo(e.target.value || '')} className='todo-value todo-edit-input'/>
                  <button onClick={handleEdit}>Save changes</button>  
                </>
                : <>
                  <p className={`todo-value ${todoItem.completed ? 'completed' : ''}`}>{todoItem.value}</p>
                  <button onClick={() => setEditing(true)} disabled={todoItem.completed}>Edit</button>
                </>
            }
            
            <button onClick={handleDelete}>Delete</button>
        </div>
}
  
function App() {

  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([])

  const addTodo = (event) => {
    event.preventDefault()

    if (!input.trim()) return

    setTodoList(prev => [...prev, {
      id: generateRandomId(),
      value: input, 
      completed: false
    }])

    setInput('')
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={(e) => addTodo(e)}>
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add Item to Todo'/>
          <button>Save Todo</button>
      </form>
      <div className='todo-container'>
        {todoList.map(item => <TodoItem todoItem={item} key={item.id} setTodoList={setTodoList}/>)}
      </div>
    </div>
  )
}

export default App
