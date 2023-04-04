import { useState } from "react";

// Custom hooks
import useLocalStorage from "./hooks/useLocalStorage";

// custom components
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
  const [editedTask, setEditedTask] = useState(null);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id == taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) =>
        t.id == task.id ? { ...task, name: task.name } : task
      )
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
