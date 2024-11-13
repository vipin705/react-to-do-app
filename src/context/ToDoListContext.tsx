import { createContext, useEffect, useReducer } from 'react';
import { Task } from '@/modals/task';

type State = {
  tasks: Task[];
};

export type Action =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'CHANGE_STATUS'; payload: { id: string; status: string } };

const initialState: State = {
  tasks: [],
};

export const ToDoContext = createContext(
  {} as { tasks: Task[]; dispatch: React.Dispatch<Action> }
);

function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      localStorage.setItem(
        'tasks',
        JSON.stringify([...state.tasks, action.payload])
      );
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'REMOVE_TASK': {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return {
        ...state,
        tasks: [...filteredTasks],
      };
    }
    case 'EDIT_TASK': {
      const { status, description, priority, title } = action.payload;
      let task = state.tasks.find((task) => task.id === action.payload.id);
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      task = { ...task, status, description, priority, title } as Task;
      state.tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify([...state.tasks]));
      return {
        ...state,
        tasks: [...state.tasks],
      };
    }
    default:
      return state;
  }
}

function ToDoListContext({ children }: { children: React.ReactNode }) {
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(data) });
    }
  }, []);

  return (
    <ToDoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoListContext;
