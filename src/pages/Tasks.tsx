import CreateTask from '../features/add-task/CreateTask';
import TaskList from '../features/tasks-table/TaskList';
import Heading from '../components/ui/Heading';

function Tasks() {
  return (
    <>
      <div className='flex justify-between items-center w-full'>
        <Heading>Task list</Heading>
        <div>filters</div>
      </div>
      <TaskList />
      <CreateTask />
    </>
  );
}

export default Tasks;
