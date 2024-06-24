import React, { useState } from 'react';
import axios from 'axios';
const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/todos', { task });
      onAdd(response.data);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ padding: "20px 10%"  }}>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Enter your task here'/>
      <button style={{ width: "100%"  }} onClick={addTodo}>Add Task</button>
    </div>
  );
};
export default TodoForm;