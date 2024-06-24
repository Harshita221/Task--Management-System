import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import axios from 'axios';
import './styles/App.css'; // Import the custom styles

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div style={{alignItems: "center", textAlign:"center"   }}>
      <h1>TASK MANAGEMENT</h1>
      <TodoForm onAdd={addTodo} />
      <ul style={{ padding: "20px 10%"  }}>
        {todos.map(todo => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;