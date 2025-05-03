import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PingPongExample from '../ui/PingPongExample';


const StartContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden space-y-6">
      <Link className="text-md hover:text-blue-600 underline" to={'example'}>
        Go to example page
      </Link>
      <PingPongExample/>
    </div>
  );
};

export default StartContent;