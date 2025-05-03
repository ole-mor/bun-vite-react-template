import React, { useState } from 'react';
import { CandyItem } from '../../data/candyData';

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

interface AmountSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  item: CandyItem;
}

interface SelectedCandy {
  name: string;
  amount: number | "Mange";
  imageUrl: string;
}

const AMOUNT_OPTIONS = [0, 1, 2, 3, 4, 5, 8, "Mange"] as const;
let newSelectedAmount = 0
type AmountOption = (typeof AMOUNT_OPTIONS)[number];

const AmountSelector: React.FC<AmountSelectorProps> = ({ isOpen, onClose, item }) => {
  const [selectedAmount, setSelectedAmount] = useState<AmountOption>(0);
  
  if (!isOpen) return null;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    setSelectedAmount(AMOUNT_OPTIONS[index]);
  };

  const handleAddItem = () => {
    const selectedCandies: SelectedCandy[] = JSON.parse(localStorage.getItem('selectedCandies') || '[]');
    
    const existingItemIndex = selectedCandies.findIndex(candy => candy.name === item.name);
    if (selectedAmount != 0) {
    if (selectedAmount === "Mange") {
        newSelectedAmount = randomIntFromInterval(10, 16);
    } else {
        newSelectedAmount = selectedAmount;
    }

    if (existingItemIndex !== -1) {
      selectedCandies[existingItemIndex].amount = selectedAmount;
    } else {
      selectedCandies.push({
        name: item.name,
        amount: newSelectedAmount,
        imageUrl: item.imageUrl
      });
    }
    }
    
    localStorage.setItem('selectedCandies', JSON.stringify(selectedCandies));
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-amber-600/20 blur-lg z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-4xl h-96 shadow-xl p-4 w-[320px] max-w-md transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className='relative m-2 text-[1.2rem] -space-y-4 font-modak flex flex-col justify-start items-start text-[#E86730]'>
            <h1 className="text-center">Smågodt</h1>
            <h1 className="text-center">posen.no</h1>
          </div>
          <div className="flex flex-col mt-4 h-[80px] justify-start items-start mb-4">
            <p className="text-xl/5 text-black mx-6 ">Hvor mange biter {item.name} vil du ha?</p>
          </div>
          
          <div className="pl-3">
            <div className="relative pt-8 flex justify-center pl-3">
              <div className="absolute w-[240px] left-2 bg-gray-200 rounded-full flex justify-center items-center">
                {AMOUNT_OPTIONS.map((_, index) => (
                  <div
                    key={index}
                    className="absolute bg-white border-4 -top-4 border-[#000000] rounded-full"
                    style={{
                      left: `${(index / (AMOUNT_OPTIONS.length - 1)) * 100}%`,
                      backgroundColor: index === AMOUNT_OPTIONS.indexOf(selectedAmount) ? '#E86730' : 'white'
                    }}
                  />
                ))}
              </div>

              <span className='absolute w-[260px] -bottom-7 bg-gradient-to-r from-[#EEEEEE] to-[#FFCCCC] h-2.5 left-0 rounded-full'/>

              <input
                type="range"
                min={0}
                max={AMOUNT_OPTIONS.length - 1}
                value={AMOUNT_OPTIONS.indexOf(selectedAmount)}
                onChange={handleSliderChange}
                className="
                  absolute 
                  w-[258px]
                  left-1
                  appearance-none
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4.5
                  [&::-webkit-slider-thumb]:h-12
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#9e9e9e]
                  [&::-webkit-slider-thumb]:cursor-pointer
                "
              />

              <div className="absolute w-[240px] -top-3 left-3">
                {AMOUNT_OPTIONS.map((value, index) => (
                  <div
                    key={index}
                    className={`absolute transform -translate-1/2 flex ${value === "Mange" ? "text-xs" : "text-lg"} text-black`}
                    style={{
                      left: `${(index / (AMOUNT_OPTIONS.length - 1)) * 100}%`,
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className='relative top-[105px] w-[200px] flex justify-between items-center ml-10'>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                Kanseller
              </button>
              <button 
                onClick={handleAddItem}
                className="w-[80px] bg-[#B8F890] hover:bg-[#98d572] text-black py-2 px-4 rounded-full transition-colors"
              >
                Legg til
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmountSelector;
