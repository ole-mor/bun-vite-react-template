import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Removed: import { Copy } from 'lucide-react';

const CodePage: React.FC = () => {
  const { generatedCode } = useParams<{ generatedCode?: string }>();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  useEffect(() => {
    // Optional: Clear localStorage
    // localStorage.removeItem('selectedCandies');
    // window.dispatchEvent(new StorageEvent('storage', { key: 'selectedCandies' }));
  }, []);


  if (!generatedCode) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Feil</h1>
            <p className="text-gray-700 mb-6">Ingen kode funnet. Gå tilbake og prøv å lagre posen på nytt.</p>
            <Link
                to="/selection"
                className="bg-[#E86730] hover:bg-[#d15420] text-white px-6 py-3 rounded-full transition-colors"
            >
                Tilbake til utvalg
            </Link>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#E86730]">
      <div className=" p-8 rounded-xl flex flex-col justify-center text-center w-full">
        <h1 className="text-[5rem] font-modak mb-4">WOW!</h1>
        <div className='flex justify-between items-center text-md mb-2 mx-10'>
            <p className=''>Kopier linken</p>
            <button
                onClick={handleCopyCode}
                className={`text-black transition-colors font-medium ${ // Adjusted padding for text
                isCopied
                    ? 'text-white'
                    : ''
                }`}
                aria-label="Copy code"
            >
                {/* Replaced icon with text */}
                {isCopied ? 'Kopiert!' : 'Kopier'}
            </button>
        </div>
        <div className="flex items-center justify-center bg-white rounded-[18px] py-2 mx-10 mb-6">
          <span className="text-2xl text-gray-800 tracking-widest mr-4">
            {generatedCode}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center pt-20 relative top-10">
            <Link
                to="/"
                className=" text-white px-6 underline py-3 rounded-full transition-colors"
            >
                Til forsiden
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
