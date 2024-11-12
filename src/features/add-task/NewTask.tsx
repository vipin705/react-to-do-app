import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useToDoList } from '../../context/toDoContextHelper';
import { Task } from '@/modals/task';

const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters long',
    })
    .max(100, {
      message: 'Title must be at most 100 characters long',
    }),
  status: z.enum(['backlog', 'in-progress', 'done', 'cancelled', 'to-do'], {
    message: 'Status must be selected',
  }),
  priority: z.enum(['Low', 'Medium', 'High'], {
    message: 'Priority must be Low, Medium or High',
  }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(1000, {
      message: 'Description must be at most 1000 characters long',
    }),
});

function NewTask({
  closeOnSubmit,
  editTask,
  disabled = false,
}: {
  closeOnSubmit: () => void;
  editTask?: Task;
  disabled?: boolean;
}) {
  const { dispatch } = useToDoList();

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: editTask?.title || '',
      status:
        (editTask?.status as
          | 'backlog'
          | 'in-progress'
          | 'done'
          | 'cancelled'
          | 'to-do') || 'to-do',
      priority:
        (editTask?.priority as 'Low' | 'Medium' | 'High' | undefined) ||
        undefined,
      description: editTask?.description || '',
    },
  });

  function handleSubmit(data: z.infer<typeof taskFormSchema>) {
    const { title, priority, status, description } = data;
    if (editTask) {
      dispatch({
        type: 'EDIT_TASK',
        payload: {
          id: editTask.id,
          title,
          priority,
          status,
          description,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: `TSK-${Math.floor(Math.random() * 1000)}`,
          title,
          status,
          priority,
          description,
        },
      });
    }
    closeOnSubmit?.();
  }

  return (
    <div className='w-[80rem] overflow-hidden'>
      {!disabled && (
        <h2 className='text-3xl font-semibold border-b-2 pb-2 mb-4'>
          {editTask ? 'Edit task' : 'Add new task'}
        </h2>
      )}
      {disabled && (
        <h2 className='text-3xl font-semibold border-b-2 pb-2 mb-4'>
          Task details
        </h2>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-col gap-8 text-3xl'
        >
          <div className='flex gap-4 w-full items-center flex-wrap'>
            <div className='w-full'>
              <FormField
                disabled={disabled}
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold text-xl'>
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Task title'
                        {...field}
                        className='h-[3.5rem] text-xl w-full'
                      />
                    </FormControl>
                    <FormMessage className='text-lg font-light' />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-1/4'>
              <FormField
                disabled={disabled}
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold text-xl '>
                      Priority
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className='w-full h-14 text-xl'
                          disabled={disabled}
                        >
                          <SelectValue
                            placeholder='Set priority'
                            className='font-extralight'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='High'>High</SelectItem>
                        <SelectItem value='Medium'>Medium</SelectItem>
                        <SelectItem value='Low'>Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-lg font-light' />
                  </FormItem>
                )}
              />
            </div>
            {editTask && (
              <div className='w-1/4'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold text-xl '>
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className='w-full h-14 text-xl'
                            disabled={disabled}
                          >
                            <SelectValue
                              placeholder='Set priority'
                              className='font-extralight'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='backlog'>Backlog</SelectItem>
                          <SelectItem value='in-progress'>
                            In Progress
                          </SelectItem>
                          <SelectItem value='done'>Done</SelectItem>
                          <SelectItem value='cancelled'>Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className='text-lg font-light' />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormField
            disabled={disabled}
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-xl'>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Task description'
                    {...field}
                    className='text-xl'
                  />
                </FormControl>
                <FormMessage className='text-lg font-light' />
              </FormItem>
            )}
          />
          {!disabled && (
            <Button type='submit' className='w-1/3 h-[3.5rem] text-xl'>
              {editTask ? 'Save task' : 'Add new task'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default NewTask;
