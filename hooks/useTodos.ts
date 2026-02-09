import { useReducer } from "react";
import { Task } from "../types/task";

type TodoState = {
  tasks: Task[];
};

type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: string }
  | { type: "TOGGLE"; payload: string };

const initialState: TodoState = {
  tasks: [],
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD": {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload,
        done: false,
      };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }

    case "REMOVE":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "TOGGLE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };

    default:
      return state;
  }
};

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    dispatch({ type: "ADD", payload: text.trim() });
  };

  const removeTask = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  return {
    tasks: state.tasks,
    addTask,
    removeTask,
    toggleTask,
  };
};