import TodoItem from './TodoItem';

export default function TodoList({ tasks, setTasks }) {

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
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}
