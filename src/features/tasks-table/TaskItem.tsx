import { TableRow, TableCell } from '@/components/ui/table';
import { Task } from '@/modals/task';
// import { MdDeleteOutline } from 'react-icons/md';

type TaskProps = {
  task: Task;
};

function TaskItem({ task }: TaskProps) {
  return (
    <TableRow>
      <TableCell className='font-medium'>{task.id}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell className='text-right'>...</TableCell>
    </TableRow>
  );
}

export default TaskItem;
