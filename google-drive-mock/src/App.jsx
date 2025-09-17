import { useState } from 'react'
import './App.css'
import fileData from './data.json'

function Breadcrumb({ path }) {
  return (
    <div className='breadcrumbs'>
        {
          path.map((node, idx) => 
            <span key={node.id} className='crumb'>
              <div onClick={() => handleBreadcrumbClick(idx)}>
                {node.name}
              </div>
              {idx < path.length - 1 && ' / '}
            </span>
          )
        }
      </div>
  )
}

function App() {
  const [path, setPath] = useState([fileData])
  const currentFolder = path[path.length - 1]

  const handleFolderClick = (folder) => {
    setPath(prev => [...prev, folder])
  }

  const handleBreadcrumbClick = (index) => {
    setPath(prev => prev.slice(0, index+1))
  }

  return (
    <div className='container'>
      <h1>Mock Google drive / file explorer</h1>
      <Breadcrumb path={path} />
      <div className='folder-grid'>
        {
          currentFolder.children?.map((child) => {
            if (child.type === 'folder') {
              return (
                <div className='node folder' key={child.id} onClick={() => handleFolderClick(child)}>
                    {child.name}
                </div>
              )
            } else {
              return (
                <div className='node file' key={child.id}>
                    {child.name}
                </div>
              )
            }
          })
        }
        <div className='add-file-folder'></div>
      </div>
    </div>
  )
}

export default App
