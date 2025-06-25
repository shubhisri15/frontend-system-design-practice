import { useState } from "react"

export default function App() {
    const [taskList, setTaskList] = useState([])

    const tasksDone = []
    const tasksNotDone = []

    function addTask() {
        
    }

    return (
        <div>
            <h1>Task list</h1>
            <button onClick={addTask}>+ Add a task</button>
            <div>
                <h1>To-do</h1>
                {tasksNotDone}
            </div>
            <hr />
            <div>
                <h1>Done</h1>
                {tasksDone}
            </div>
        </div>
    )
}