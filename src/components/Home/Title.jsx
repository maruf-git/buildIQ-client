/* eslint-disable react/prop-types */


const Title = ({title,des}) => {
    return (
        <div className='flex flex-col items-center w-full lg:w-[60%] mx-auto mb-5'>
            <p className='text-3xl md:text-4xl font-bold text-center mb-3'>{title}</p>
            <p className='text-[18px] md:text-xl text-center'>{des}</p>
        </div>
    );
};

export default Title;