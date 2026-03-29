const LoadingSpinner = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full min-h-[60vh] gap-4'>
            <div className='relative w-14 h-14'>
                <div className='absolute inset-0 rounded-full border-4 border-gray-100' />
                <div className='absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin' />
            </div>
            <p className='text-sm font-medium text-gray-400'>Loading...</p>
        </div>
    )
}

export default LoadingSpinner