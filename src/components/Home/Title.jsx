import React from 'react';

const Title = ({title,des}) => {
    return (
        <div className='flex flex-col items-center w-[60%] mx-auto mb-5'>
            <p className='text-4xl font-bold text-center mb-3'>{title}</p>
            <p className='text-xl text-center'>{des}</p>
        </div>
    );
};

export default Title;