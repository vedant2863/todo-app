import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTodos, createUserTodo, deleteUserTodo, selectTodos } from '../features/todos/todosSlice';

const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(selectTodos);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchUserTodos());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUserTodo(title));
    setTitle('');
  };

  return (
    <div>
      <h2>Todos</h2>
      {status === 'failed' && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.status}
            <button onClick={() => dispatch(deleteUserTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
