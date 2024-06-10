export const Key = ({ tecla }: { tecla: string }) => {

  return (
    <div className='flex size-6 items-center justify-center rounded-sm bg-neutral-900 text-sm text-neutral-600 shadow shadow-black'>
      <p className='flex size-5 w-[20px] items-center justify-center rounded-sm bg-neutral-800 text-sm'>
        {tecla.toUpperCase()}
      </p>
    </div>
  );
};