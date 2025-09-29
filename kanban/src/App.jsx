import { useState } from "react";
import "./App.css";

const initialColumns = [
  { name: "Todo", value: "todo" },
  { name: "In Progress", value: "progress" },
  { name: "Done", value: "done" },
];

const initialTasks = [
  {
    id: `task-${Date.now()}`,
    title: "Default",
    description: "Generic description",
    status: "todo",
  },
];

function Task({ task, setDraggedTask }) {
  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task)} 
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}

function Column({ column, tasks, setDraggedTask, draggedTask, setTasks }) {
  const handleDrop = () => {
    if (!draggedTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTask.id ? { ...t, status: column.value } : t
      )
    );
    setDraggedTask(null); // ✅ Clear after drop
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>{column.name}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} setDraggedTask={setDraggedTask} />
      ))}
    </div>
  );
}

export default function App() {
  const [columns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  return (
    <main>
      <h1>Kanban</h1>
      <div className="column-container">
        {columns.map((col) => (
          <Column
            key={col.value}
            column={col}
            tasks={tasks.filter((t) => t.status === col.value)}
            setDraggedTask={setDraggedTask}
            draggedTask={draggedTask}
            setTasks={setTasks}
          />
        ))}
      </div>
    </main>
  );
}
