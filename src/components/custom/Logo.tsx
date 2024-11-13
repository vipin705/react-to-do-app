function Logo() {
  return (
    <div className='rounded-full flex flex-col justify-center items-center'>
      <img className='h-[7rem] w-auto' src='/iodo-list.png' alt='to do list' />
      <p className='font-thin tracking-wider'>To-do list</p>
    </div>
  );
}

export default Logo;
