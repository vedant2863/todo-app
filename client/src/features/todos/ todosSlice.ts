import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './todosAPI';

interface Todo {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setStatus: (state, action: PayloadAction<TodosState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodos, addTodo, updateTodo, removeTodo, setStatus, setError } = todosSlice.actions;

export const fetchUserTodos = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStatus('loading'));
  try {
    const state = getState();
    const token = state.auth.token;
    const todos = await fetchTodos(token);
    dispatch(setTodos(todos));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const createUserTodo = (title: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStatus('loading'));
  try {
    const state = getState();
    const token = state.auth.token;
    const newTodo = await createTodo(title, token);
    dispatch(addTodo(newTodo));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const updateUserTodo = (id: string, title: string, status: 'pending' | 'completed') => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStatus('loading'));
  try {
    const state = getState();
    const token = state.auth.token;
    const updatedTodo = await updateTodo(id, title, status, token);
    dispatch(updateTodo(updatedTodo));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const deleteUserTodo = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStatus('loading'));
  try {
    const state = getState();
    const token = state.auth.token;
    await deleteTodo(id, token);
    dispatch(removeTodo(id));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
