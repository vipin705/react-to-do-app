import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToDoList } from '@/context/toDoContextHelper';

export function MenuItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { dispatch } = useToDoList();

  return (
    <DropdownMenuItem
      onClick={() => {
        dispatch({ type: 'REMOVE_TASK', payload: id });
      }}
      className='text-lg'
    >
      {children}
    </DropdownMenuItem>
  );
}
