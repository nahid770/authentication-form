import React from 'react';

const ErrorMessage = () => {
    return (
        <div>
            <ul className='my-1'>
                <li className='text-white text-left '>Password should be at least one upper case</li>
                <li className='text-white text-left '>at least one digit</li>
                <li className='text-white text-left '>one special character</li>
            
            </ul>
        </div>
    );
};

export default ErrorMessage;