import { createContext, useReducer } from 'react';
import { Task } from '@/modals/task';

type State = {
  tasks: Task[];
};

export type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'CHANGE_STATUS'; payload: { id: string; status: string } };

const initialState: State = {
  tasks: [
    {
      id: 'TSK-1',
      title: 'Task 1',
      priority: 'High',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.',
      status: 'in progress',
    },
    {
      id: 'TSK-2',
      title: 'Task 2',
      priority: 'Medium',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla',
      status: 'backlog',
    },
    {
      id: 'TSK-3',
      title: 'Task 3',
      priority: 'Low',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa',
      status: 'cancelled',
    },
  ],
};

export const ToDoContext = createContext(
  {} as { tasks: Task[]; dispatch: React.Dispatch<Action> }
);

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
    case 'EDIT_TASK': {
      const { status, description, priority, title } = action.payload;
      let task = state.tasks.find((task) => task.id === action.payload.id);
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      task = { ...task, status, description, priority, title } as Task;
      state.tasks[index] = task;
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
  return (
    <ToDoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoListContext;
