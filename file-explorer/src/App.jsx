import { useState } from 'react'
import data from './data.json'
import './App.css'
 
const File = ({item}) => {
  const [showChildren, setShowChildren] = useState(false)
  const isDirectory = !!item.children

  return (
    <div className='file'>
      <div>
        {item.name} 
        {item.children && <button style={{ marginLeft: '8px'}} onClick={() => setShowChildren(prev => !prev)}>{showChildren ? '-' : '+'}</button>}
      </div>
      
      {item.children && showChildren && item.children.map(child => <File key={child.id} item={child}/>)}
    </div>
  )
}

function App() {
  //const [filedata, setFileData] = useState(data)

  return (
    <div>
      {data.map(item => <File key={item.id} item={item}/>)}
    </div>
  )
}

export default App
