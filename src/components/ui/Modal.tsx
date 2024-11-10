import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { HiXMark } from 'react-icons/hi2';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalContextType {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openName: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactNode;
  opens: string;
}) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Open must be used within a ModalProvider');
  }
  const { open } = context;
  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opensWindowName),
  });
}

function Window({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Window must be used within a ModalProvider');
  }
  const { openName, close } = context;

  const ref = useClickOutside(close);

  if (openName !== name) {
    return null;
  }

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-screen backdrop-blur-sm transition-all ease-in z-10 !pointer-events-auto border-r-4'>
      <div
        ref={ref}
        className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-gray-50 shadow-xl py-14 px-16 transition-all ease-in'
      >
        {cloneElement(children as React.ReactElement, { closeOnSubmit: close })}
        <Button
          variant='ghost'
          size='icon'
          onClick={close}
          className='absolute top-6 right-4'
        >
          <HiXMark />
        </Button>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
