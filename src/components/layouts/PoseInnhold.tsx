import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface SelectedCandy {
  name: string;
  amount: number;
  imageUrl: string;
}

// Helper function to determine background color class based on amount
const getWeightColorClass = (amount: number): string => {
  if (isNaN(amount)) return 'bg-gray-100'; // Use a neutral color while input is temporarily empty/NaN
  if (amount <= 0) return 'bg-white'; // Default for zero or less (before removal)
  if (amount === 1) return 'bg-yellow-100';
  if (amount === 2) return 'bg-yellow-200';
  if (amount === 3) return 'bg-yellow-300';
  if (amount === 4) return 'bg-yellow-400';
  if (amount === 5) return 'bg-orange-300'; // Transition through orange
  if (amount === 6) return 'bg-orange-400';
  if (amount === 7) return 'bg-red-300'; // Start transitioning to red
  if (amount === 8) return 'bg-red-400';
  if (amount === 9) return 'bg-red-500';
  if (amount >= 10) return 'bg-red-600'; // Cap at red-600 for 10+
  return 'bg-white'; // Fallback
};


const PoseContent: React.FC = () => {
  const { poseId } = useParams<{ poseId?: string }>();
  const [selectedCandies, setSelectedCandies] = useState<SelectedCandy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
    const loadSelectedCandies = () => {
      const savedCandies = localStorage.getItem('selectedCandies');
      if (savedCandies) {
        const parsedCandies: SelectedCandy[] = JSON.parse(savedCandies).map((item: any) => ({
          ...item,
          amount: (typeof item.amount === 'number' && item.amount >= 1 && item.amount <= 100) ? item.amount : 1,
        }));
        setSelectedCandies(parsedCandies);
      } 
    };

    loadSelectedCandies();
    window.addEventListener('storage', loadSelectedCandies);
    return () => window.removeEventListener('storage', loadSelectedCandies);
  }, []);

  const updateLocalStorage = (candies: SelectedCandy[]) => {
    localStorage.setItem('selectedCandies', JSON.stringify(candies));
  };

  const updateCandyAmount = (candyName: string, newAmount: number) => {
    let updatedCandies;
    const amount = Math.max(0, Math.min(100, isNaN(newAmount) ? 0 : newAmount));

    if (amount <= 0) {
      updatedCandies = selectedCandies.filter(candy => candy.name !== candyName);
    } else {
       updatedCandies = selectedCandies.map(candy =>
         candy.name === candyName ? { ...candy, amount: amount } : candy
       );
    }
    setSelectedCandies(updatedCandies);
    updateLocalStorage(updatedCandies);
  };

 const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>, candyName: string) => {
    const value = e.target.value;

    if (value === '') {
         setSelectedCandies(candies => candies.map(c => c.name === candyName ? {...c, amount: NaN } : c));
    } else if (/^[0-9]*$/.test(value)) {
        let newAmount = parseInt(value, 10);
        if (!isNaN(newAmount)) {
            if (newAmount > 100) {
                newAmount = 100;
            }
            setSelectedCandies(candies => candies.map(c => c.name === candyName ? {...c, amount: newAmount } : c));
        }
    }
 };


 const handleQuantityInputBlur = (e: React.FocusEvent<HTMLInputElement>, candyName: string) => {
    const value = e.target.value;
    let finalAmount = parseInt(value, 10);

    if (value === '' || isNaN(finalAmount) || finalAmount <= 0) {
        updateCandyAmount(candyName, 0);
    } else {
        finalAmount = Math.max(1, Math.min(finalAmount, 100));
        updateCandyAmount(candyName, finalAmount);
    }
 };

  const handleResetPose = () => {
    setSelectedCandies([]);
    localStorage.removeItem('selectedCandies');
    window.dispatchEvent(new StorageEvent('storage', { key: 'selectedCandies' }));
 };


 const handleFinalizePose = async () => {
  if (selectedCandies.length === 0) {
      setError("Posen er tom. Legg til smågodt før du fullfører.");
      return;
  }
  setIsLoading(true);
  setError(null);

  try {
      const apiUrl = '/api/UploadPoseInnhold';

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candies: selectedCandies }), // Send the candy data
      });

      if (!response.ok) {
          const errorData = await response.json().catch(() => ({})); // Try to parse error details
          throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.code) {
          localStorage.removeItem('selectedCandies');
          setSelectedCandies([]);

          navigate(`/code/${result.code}`);
      } else {
          throw new Error(result.error || 'Failed to save pose or get code.');
      }

  } catch (err: unknown) {
      console.error("Error finalizing pose:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
  } finally {
      setIsLoading(false); // Stop loading regardless of outcome
  }
};


  return (
    <div className='flex flex-col items-start w-full min-h-svh bg-white'>

      <div className="flex flex-col gap-4 md:gap-6 mt-8 w-full">
        {selectedCandies.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto p-4">
            {selectedCandies.map((candy) => (
              <div
                key={candy.name}
                className='flex justify-between items-center border rounded-lg'
              >
                <div className="flex flex-row items-center justify-start gap-4 flex-grow mr-4">
                  <img
                    src={candy.imageUrl}
                    alt={candy.name}
                    className="flex w-14 h-14 object-contain rounded"
                    loading="lazy"
                  />
                  <span className="text-sm md:text-base text-black font-medium">
                    {candy.name}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => updateCandyAmount(candy.name, (isNaN(candy.amount) ? 1 : candy.amount) - 1)}
                    className='w-8 h-8 text-black font-bold text-xl flex items-center justify-center'
                    disabled={isNaN(candy.amount) || candy.amount <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={isNaN(candy.amount) ? '' : candy.amount}
                    onChange={(e) => handleQuantityInputChange(e, candy.name)}
                    onBlur={(e) => handleQuantityInputBlur(e, candy.name)}
                    className={`w-8 h-10 text-black text-center focus:outline-none border-none ${getWeightColorClass(candy.amount)} border-gray-300 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    aria-label={`Quantity for ${candy.name}`}
                  />
                  <button
                     onClick={() => updateCandyAmount(candy.name, (isNaN(candy.amount) ? 0 : candy.amount) + 1)}
                     className='w-8 h-8 text-black font-bold text-xl flex items-center justify-center'
                     disabled={isNaN(candy.amount) || candy.amount >= 100}
                 >
                    +
                  </button>
                  <button
                    onClick={() => updateCandyAmount(candy.name, 0)}
                    className='hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-lg ml-2 px-2 py-1'
                    aria-label={`Remove ${candy.name}`}
                  >
                    Fjærn
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 justify-center text-center py-80 w-full">
            Ingen smågodt i posen.
          </p>
        )}
        <div className='fixed bottom-0 w-full h-[160px] space-y-6'>
          <div className="flex justify-center items-center w-full">
            <button
              onClick={handleFinalizePose} // Call the finalize function
              disabled={isLoading || selectedCandies.length === 0} // Disable while loading or if empty
              className="bg-[#E86730] hover:bg-[#d15420] text-white px-20 text-3xl py-4 rounded-full transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Lagrer...' : 'Ferdiggjør pose'} {/* Change text while loading */}
            </button>
          </div>
          <div className="flex justify-between items-center text-black text-lg px-28">
            <Link className="" to={'/selection'}>
              Gå tilbake
            </Link>
            <button onClick={handleResetPose}>Nullstill</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseContent;
