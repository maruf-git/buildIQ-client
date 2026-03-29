const ContentLoadingSpinner = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full py-10 gap-3'>
            <div className='relative w-10 h-10'>
                <div className='absolute inset-0 rounded-full border-[3px] border-gray-100' />
                <div className='absolute inset-0 rounded-full border-[3px] border-green-500 border-t-transparent animate-spin' />
            </div>
            <p className='text-xs font-medium text-gray-400'>Loading...</p>
        </div>
    );
};

export default ContentLoadingSpinner;