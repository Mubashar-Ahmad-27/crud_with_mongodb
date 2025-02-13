export default function TodoItem({ task, deleteTask }) {

    const handleDelete = async (id) => {
        try {
            await fetch('/api/todos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            deleteTask(id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <li className="flex justify-between items-center bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="text-lg">{task.title}</span>
            <button  onClick={() => handleDelete(task.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition" >
                Delete
            </button>
        </li>
    );
}
