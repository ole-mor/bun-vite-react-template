import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import candyItems, { generateItemId, CandyItem } from '../../data/candyData';

// Interface for the data structure fetched from Firebase
interface FetchedCandy {
  name: string;
  amount: number;
}

// Interface for the merged data structure used for rendering
interface DisplayCandy extends FetchedCandy {
  imageUrl: string; // Add imageUrl back
}

// Helper function to determine background color class based on amount
// (Copied from PoseContent - consider moving to a shared utils file)
const getWeightColorClass = (amount: number): string => {
  if (isNaN(amount)) return 'bg-gray-100';
  if (amount <= 0) return 'bg-white';
  if (amount === 1) return 'bg-yellow-100';
  if (amount === 2) return 'bg-yellow-200';
  if (amount === 3) return 'bg-yellow-300';
  if (amount === 4) return 'bg-yellow-400';
  if (amount === 5) return 'bg-orange-300';
  if (amount === 6) return 'bg-orange-400';
  if (amount === 7) return 'bg-red-300';
  if (amount === 8) return 'bg-red-400';
  if (amount === 9) return 'bg-red-500';
  if (amount >= 10) return 'bg-red-600';
  return 'bg-white';
};

// Create a map for quick lookup of candy details by name
const candyDataMap = new Map<string, CandyItem>(
    candyItems.map(item => [item.name, item])
);


const ViewPoseContent: React.FC = () => {
  const { poseCode } = useParams<{ poseCode?: string }>(); // Get code from URL
  const [displayCandies, setDisplayCandies] = useState<DisplayCandy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null); // To display save time
  console.log(poseCode)
  useEffect(() => {
    if (!poseCode) {
      setError("Ingen posekode oppgitt.");
      setIsLoading(false);
      return;
    }

    const fetchPoseData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // API endpoint to fetch pose by code
        const apiUrl = `/api/poses/${poseCode}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Fant ingen pose med koden '${poseCode}'.`);
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.pose && Array.isArray(result.pose.candies)) {
          // Merge fetched data (name, amount) with local data (imageUrl)
          const mergedCandies: DisplayCandy[] = result.pose.candies
            .map((fetchedCandy: FetchedCandy) => {
              const localData = candyDataMap.get(fetchedCandy.name);
              if (localData) {
                return {
                  ...fetchedCandy,
                  imageUrl: localData.imageUrl, // Get imageUrl from local data
                };
              }
              console.warn(`Could not find local data for candy: ${fetchedCandy.name}`);
              return null; // Handle case where candy name might not exist locally anymore
            })
            .filter((candy: FetchedCandy): candy is DisplayCandy => candy !== null); // Filter out nulls

          setDisplayCandies(mergedCandies);

          // Format timestamp if available
          if (result.pose.createdAt) {
             try {
                const date = new Date(result.pose.createdAt);
                setCreatedAt(date.toLocaleString('nb-NO')); // Format for Norwegian locale
             } catch (e) {
                console.error("Error formatting timestamp:", e);
                setCreatedAt("Ukjent dato");
             }
          }

        } else {
          throw new Error(result.error || 'Ugyldig data mottatt fra server.');
        }
      } catch (err: unknown) {
        console.error("Error fetching pose data:", err);
        setError(err instanceof Error ? err.message : 'En ukjent feil oppstod under henting av posen.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoseData();
  }, [poseCode]); // Re-fetch if poseCode changes

  return (
    <div className='flex flex-col items-center w-full min-h-svh bg-white p-4'>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 my-6">Innhold i Pose: {poseCode}</h1>

      {isLoading && (
        <div className="flex items-center justify-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#E86730]"></div>
          <p className="text-gray-600 text-xl ml-4">Laster inn posen...</p>
        </div>
      )}

      {error && (
        <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 text-center rounded mt-6">
          <p>{error}</p>
           <Link className="text-blue-600 hover:underline mt-4 inline-block" to={'/'}>
             Tilbake til startsiden
           </Link>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="w-full space-y-3 pb-10">
            {displayCandies.length > 0 ? (
              displayCandies.map((candy) => { 
                const candyId = generateItemId(candy.name);
                
                return (
                <div className='flex w-full'>
                    <Link
                    to={`/pose/${poseCode}/${candyId}`}
                    className="
                        flex w-full flex-row justify-between
                        group mx-6
                    "
                    >
                    <div className='flex justify-center items-center gap-4'>
                        <img
                            src={candy.imageUrl}
                            alt={candy.name}
                            className="flex w-14 h-14 object-contain"
                            loading="lazy"
                        />
                        <span className="text-sm md:text-base text-black font-medium flex justify-start mb-6">
                            {candy.name}
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span
                            className={`w-8 h-10 flex items-center justify-center text-black text-center font-semibold border-none ${getWeightColorClass(candy.amount)} rounded-xl`}
                            aria-label={`Antall for ${candy.name}`}
                        >
                        {candy.amount}
                        </span>
                    </div>
                    </Link>
                </div>
              )})
            ) : (
              <p className="text-gray-500 text-center py-8 w-full">
                Denne posen ser ut til å være tom.
              </p>
            )}
          </div>
           <div className="mt-6 flex justify-center w-full">
             <Link
               to="/" // Link back to start page or selection
               className="bg-[#E86730] hover:bg-[#d15420] text-white px-6 py-3 rounded-full transition-colors"
             >
               Tilbake til start
             </Link>
           </div>
        </>
      )}
    </div>
  );
};

export default ViewPoseContent;
