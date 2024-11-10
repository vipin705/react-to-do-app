import { Button } from '@/components/ui/button';
import Modal from '../../components/ui/Modal';
import NewTask from './NewTask';

function CreateTask() {
  return (
    <Modal>
      <Modal.Open opens='add-task'>
        <Button className='h-[4rem] w-1/6 text-xl'>Add new task</Button>
      </Modal.Open>
      <Modal.Window name='add-task'>
        <NewTask closeOnSubmit={close} />
      </Modal.Window>
    </Modal>
  );
}

export default CreateTask;
