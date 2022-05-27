import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    if (!response.ok) {
      throw new Error("Server error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async function (id, { rejectWithValue, dispatch }) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Can't delete task! Server error");
    }
    dispatch(DeleteTodo(id));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addNewTask = createAsyncThunk("todos/addNewTask", async function (text, { rejectWithValue, dispatch }) {
  try {
    const todo = {
      userId: 1,
      title: text,
      completed: false
    };
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    });
    if (!response.ok) {
      throw new Error("Can't add task! Server error");
    }
    const data = await response.json();
    dispatch(addNewTodo(data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  items: [],
  filterBy: "show/all",
  status: null,
  error: null
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addNewTodo(state, action) {
      action.payload.id = nanoid();
      state.items.unshift(action.payload);
    },

    ToggleTodo(state, action) {
      state.items.forEach((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
      });
    },
    DeleteTodo(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    changeFilterBy(state, action) {
      state.filterBy = action.payload;
    },
    MoveTask(state, action) {
      const { currentIndex, indexCurTask, curTask } = action.payload;
      if (currentIndex === indexCurTask) return;
      state.items.splice(indexCurTask, 1);
      state.items.splice(currentIndex, 0, curTask);
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.items = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [removeTodo.rejected]: setError,
    [addNewTask.rejected]: setError
  }
});

export const { addNewTodo, ToggleTodo, DeleteTodo, changeFilterBy, MoveTask } = todoSlice.actions;

export const todosList = (state) => state.todos.items;
export const todoFilter = (state) => state.todos.filterBy;

export default todoSlice.reducer;
