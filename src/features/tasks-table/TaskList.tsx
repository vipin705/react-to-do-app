import { useToDoList } from '../../context/toDoContextHelper';

import { columns } from './columns';
import { DataTable } from './data-table';

function TaskList() {
  const { tasks } = useToDoList();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}

export default TaskList;
