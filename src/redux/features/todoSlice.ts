// todoSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  todo: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
        console.log("redux log",state)
      state.todos = action.payload; 
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
        console.log("delete todo",action.payload)
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      },
  },
});

export const { setTodos, addTodo, deleteTodo,updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
