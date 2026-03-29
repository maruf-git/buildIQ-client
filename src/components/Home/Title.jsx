/* eslint-disable react/prop-types */

const Title = ({ title, des }) => {
    return (
        <div className='flex flex-col items-center w-full lg:w-[58%] mx-auto mb-10 text-center'>
            <p className='text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight'>{title}</p>
            <div className='w-10 h-1 rounded-full bg-green-500 mb-4' />
            <p className='text-base md:text-lg text-gray-500 leading-relaxed'>{des}</p>
        </div>
    );
};

export default Title;