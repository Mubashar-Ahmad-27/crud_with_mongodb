



  export default function TodoItem({ task, deleteTask }) {

    const deleteTask = async (id) => {
        try {
          await fetch('/api/todos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
    
          setTasks(tasks.filter(task => task.id !== id));
          
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };

    return (
      <li className="flex justify-between items-center bg-gray-200 text-black p-2 rounded-md">
        <span>{task.title}</span>
        <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
          Delete
        </button>
      </li>
    );
  }
  