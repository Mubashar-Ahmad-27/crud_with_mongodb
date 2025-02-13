'use client';

import { useState, useEffect } from 'react';
import TodoList from '@/components/Todolist';

export default function TodoApp() {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

  useEffect(() => {

    const fetchTodos = async () => {
      try {
            const response = await fetch('/api/todos');
            const data = await response.json();
            setTasks(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (task.trim() === '') return;
    try {
        const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: task })
      });

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-800 p-4">
      <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-white text-center mb-4">To-Do App</h1>

        <div className="flex space-x-2 mb-4">
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-2 border rounded-md text-black focus:outline-none" placeholder="Enter a task"/>

          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md"> Add </button>
        </div>

        <TodoList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}
