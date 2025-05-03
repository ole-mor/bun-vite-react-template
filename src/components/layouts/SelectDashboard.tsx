import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import candyItems, { generateItemId, CandyItem } from '../../data/candyData';
import AmountSelector from '../ui/AmountSelector';

import Rema1000 from "../../assets/rema1000.png"


const SelectDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CandyItem | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCandyItems = candyItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-svh">
      <div className='w-full h-68 bg-[#E86730] flex flex-col justify-start items-center text-black'>
        <div className='flex justify-center items-center mt-4 gap-4'>
          <div className='bg-white rounded-[23px]'>
            <input
              type="text"
              placeholder="Søk etter godteri..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="
                py-3 px-8 w-80
                text-start text-lg
                focus:outline-none placeholder-[#a0aec0] focus:placeholder-transparent
              "
            />
          </div>
          <div>
            <Link className="text-xl p-2 rounded-md bg-[#0D89D7]/60 hover:bg-[#0D89D7] text-[#E3E3E3]" to={'/pose'}>
              &rarr;
            </Link> 
          </div>
        </div>

        <div className='relative size-full flex justify-start px-12 items-center'>
          <div className='h-full w-30'>
            <div className='w-30'>
                <img src={Rema1000} alt="Smågodtpose figur" />
            </div>
            <p className='text-lg'>REMA 1000</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 md:gap-6 mt-8">
        {filteredCandyItems.length > 0 ? (
          filteredCandyItems.map((item) => {
            const itemId = generateItemId(item.name);
            return (
              <div className='flex justify-between items-center mx-8' key={itemId}>
                <Link
                  to={`/preview/${itemId}`}
                  className="
                    flex flex-row items-center justify-start
                    group gap-6 w-60
                  "
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="flex w-14 h-14 object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm md:text-base text-black font-medium flex justify-start mb-6">
                    {item.name}
                  </span>
                </Link>
                <div className='text-black'>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className='w-20 h-12 bg-[#B8F890] hover:bg-[#98d572] px-4'
                  >
                    Legg til
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          searchQuery && <p className="text-center text-gray-600 mt-4">Ingen treff for "{searchQuery}".</p>
        )}
      </div>

      <AmountSelector
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        item={selectedItem!}
      />
    </div>
  );
};

export default SelectDashboard;