import { useContext } from 'react';
import { ToDoContext } from './ToDoListContext';

export function useToDoList() {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error('useToDoList must be used within a ToDoListContext');
  }
  return context;
}
