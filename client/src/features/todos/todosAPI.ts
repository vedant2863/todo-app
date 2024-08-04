import axios from 'axios';

const API_URL = 'http://your-api-url/todos';

interface Todo {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export const fetchTodos = async (token: string | null): Promise<Todo[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.todos;
};

export const createTodo = async (title: string, token: string | null): Promise<Todo> => {
  const response = await axios.post(API_URL, { title }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.todo;
};

export const updateTodo = async (id: string, title: string, status: 'pending' | '
