import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const StartContent: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value.toUpperCase());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const trimmedCode = code.trim();

            if (trimmedCode.length === 4) {
                navigate(`/pose/${trimmedCode}`);
            } else {
                console.warn('Code must be 4 characters long.');
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-[100svh] w-screen overflow-hidden bg-[#E86730]"> {/*bg-[#E86730]*/}
            <div className='mt-36 -space-y-16'>
                <h1 className="text-center text-[5rem] sm:text-[6rem] md:text-[7rem] font-modak text-white drop-shadow-md">Smågodt</h1>
                <h1 className="text-center text-[5rem] sm:text-[6rem] md:text-[7rem] font-modak text-white drop-shadow-md">posen.no</h1>
            </div>

            <input
                type="text"
                value={code}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Skriv inn koden her"
                maxLength={4}
                className="
                    py-1 w-[60vw]
                    text-center text-[1.7rem]
                    border-b-2 focus:outline-none placeholder-[#ffffff] focus:placeholder-transparent
                "
            />
            <div className='py-16'>
              <Link className="text-md text-[E3E3E3]" to={'selection'}>
                Lag ny pose &rarr;
              </Link> 
            </div>

            <div className='w-80'>
            </div>
        </div>
    );
};

export default StartContent;
