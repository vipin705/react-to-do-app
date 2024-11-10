import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ToDoListContext from './context/ToDoListContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToDoListContext>
      <App />
    </ToDoListContext>
  </StrictMode>
);
