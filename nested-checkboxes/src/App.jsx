import { useState } from 'react'
import './App.css'
import data from './data.json'

// if parent is checked, all the children should be checked (top down traversal)
// if all children are checked, parent should be checked (bottom up traversal)

const CheckBox = ({ checkbox, checkedValues, setCheckedValues }) => {

  const allCheckboxesData = data.checkboxes

  const handleChecked = (e, checkbox) => {
    const { id, checked } = e.target;
    const updated = { ...checkedValues, [id]: checked };

    const updatedWithChildren = updateChildrenOnParentCheck(checkbox, checked, updated);
    updateParentOnAllChildrenCheck(checkbox, allCheckboxesData, updatedWithChildren)

    setCheckedValues(updatedWithChildren);
  }

  const updateChildrenOnParentCheck = (checkbox, checked, currentState) => {
    let updatedCheckedValues = { ...currentState };

    checkbox.children.forEach(childCheckbox => {
      updatedCheckedValues[childCheckbox.id] = checked;
      if (childCheckbox.children.length > 0) {
        updatedCheckedValues = updateChildrenOnParentCheck(childCheckbox, checked, updatedCheckedValues);
      }
    });

    return updatedCheckedValues;
  }
  
  const findParentCheckbox = (checkbox, allCheckboxes) => {
    for (let checkboxItem of allCheckboxes) {
      if (checkboxItem.children.some(child => checkbox.id === child.id)) return checkboxItem
      const nested = findParentCheckbox(checkbox, checkboxItem.children)
      if (nested) return nested
    }

    return null;
  }

  const updateParentOnAllChildrenCheck = (checkbox, allCheckboxes, currentState) => {
    let updatedCheckedValues = { ...currentState };

    const parent = findParentCheckbox(checkbox, allCheckboxes)
    if (!parent) return

    const areAllChildrenChecked = parent.children.every(child => updatedCheckedValues[child.id] === true)
    updatedCheckedValues[parent.id] = areAllChildrenChecked

    updateParentOnAllChildrenCheck(parent, allCheckboxes, updatedCheckedValues)
    Object.assign(currentState, updatedCheckedValues);
  }

  return (
    <div className='checkbox'>
      <input 
        type='checkbox' 
        id={checkbox.id} 
        value={checkbox.label} 
        onChange={(e) => handleChecked(e, checkbox)} 
        checked={checkedValues[checkbox.id] || false}
      />
      <label htmlFor={checkbox.label}>{checkbox.label}</label>
      {checkbox.children.length > 0 && 
        checkbox.children.map(checkbox => 
            <CheckBox  
              key={checkbox.id}
              checkbox={checkbox} 
              checkedValues={checkedValues} 
              setCheckedValues={setCheckedValues}
            />
        ) 
      }
    </div>
  )
}

function App() {
  const [checkedValues, setCheckedValues] = useState({})

  const checkBoxes = data.checkboxes.map(checkbox => 
      <CheckBox 
        key={checkbox.id}
        checkbox={checkbox} 
        checkedValues={checkedValues} 
        setCheckedValues={setCheckedValues}
      />
    )

  return (
    <main>
      <h1>Nested checkboxes</h1>
      {checkBoxes}
    </main>
  )
}

export default App
