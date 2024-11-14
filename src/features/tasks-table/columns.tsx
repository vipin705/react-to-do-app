import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/modals/task';
import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuItem } from './MenuItem';
import Modal from '@/components/ui/Modal';
import NewTask from '../add-task/NewTask';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'Task',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = `${(row.getValue('status') as string)
        .charAt(0)
        .toUpperCase()}${(row.getValue('status') as string).slice(1)}`;

      return <div>{status}</div>;
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
  },
  {
    accessorKey: 'completedAt',
    header: 'Completed at',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Modal>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' className='h-[15rem] w-[12rem]'>
              <DropdownMenuLabel className='text-xl'>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
                className='text-lg'
              >
                Copy task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Modal.Open opens='task-details'>
                <DropdownMenuItem className='text-lg'>
                  View details
                </DropdownMenuItem>
              </Modal.Open>
              <DropdownMenuSeparator />
              <Modal.Open opens='edit-task'>
                <DropdownMenuItem className='text-lg'>
                  Edit task
                </DropdownMenuItem>
              </Modal.Open>
              <DropdownMenuSeparator />
              <MenuItem id={task.id}>Delete task</MenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Modal.Window name='edit-task'>
            <NewTask closeOnSubmit={close} editTask={task} />
          </Modal.Window>
          <Modal.Window name='task-details'>
            <NewTask closeOnSubmit={close} editTask={task} disabled={true} />
          </Modal.Window>
        </Modal>
      );
    },
  },
];
