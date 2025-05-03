import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import GLBViewer from '../ui/GLBViewer';
import candyItems, { generateItemId, CandyItem } from '../../data/candyData';
import AmountSelector from '../ui/AmountSelector';

function UTF8ToAscii(item: string) {
  item = item.replace(/[æÆ]/g, (match) => (match === 'æ' ? 'ae' : 'AE'));
  item = item.replace(/[øØ]/g, (match) => (match === 'ø' ? 'oe' : 'OE'));
  item = item.replace(/[åÅ]/g, (match) => (match === 'å' ? 'aa' : 'AA'));
  return item;
}

const ItemPreview: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [selectedItem, setSelectedItem] = useState<CandyItem | null>(null);
  

  if (!itemId) {
    return null;
  }

  const currentItem = candyItems.find(
    (item) => generateItemId(UTF8ToAscii(item.name)) === UTF8ToAscii(itemId)
  );

  if (!currentItem) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Fant ikke smågodt</h2>
        <p className="mb-4 text-gray-300">Kunne ikke finne smågodt med ID: {itemId}</p>
        <Link className="text-cyan-400 hover:text-cyan-300 mt-4" to={'/selection'}>
          &larr; Tilbake til utvalget
        </Link>
      </div>
    );
  }

  const modelPath = currentItem.modelUrl;

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === dragHandleRef.current) {
      setIsDragging(true);
      if ('touches' in e) {
        setStartY(e.touches[0].clientY);
      } else {
        setStartY(e.clientY);
      }
      if (infoSectionRef.current) {
        setOffsetTop(infoSectionRef.current.offsetTop);
        document.body.classList.add('select-none');
      }
    }
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !infoSectionRef.current) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY;
    infoSectionRef.current.style.top = `${offsetTop + deltaY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove('select-none');
  };

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e);
    const touchMoveHandler = (e: TouchEvent) => handleMouseMove(e);

    if (isDragging) {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, startY, offsetTop]);

  return (
    <div className="h-[100svh] flex flex-col overflow-hidden">

      <Link className="absolute text-black h-0 text-xl p-4 z-10" to={'/selection'}>
        &larr; Gå tilbake
      </Link>
      <AmountSelector
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        item={selectedItem!}
      />

      <div className="flex h-full w-full flex-col md:flex-row flex-grow min-h-0">
        <div className="w-full h-[600px] flex-grow relative min-h-[600px] shadow overflow-hidden">
          <GLBViewer
            key={modelPath}
            glbPath={modelPath}
            modelPosition={[3, 2, 0]}
            backgroundColor="transparent"
          />
        </div>

        <div className='absolute top-10 text-[2rem] m-4 -space-y-7 font-modak flex flex-col justify-start items-start text-[#E86730]'>
          <h1 className="text-center">Smågodt</h1>
          <h1 className="text-center">posen.no</h1>
        </div>


        <div
          ref={infoSectionRef}
          className="w-full pt-4 text-black absolute bottom-0 left-0 bg-white shadow-md transition-transform duration-300 overflow-hidden"
          style={{ touchAction: 'none' }}
        >

        <div className='absolute right-0 p-1 bg-transparent hover:bg-none text-black z-20'>
          <button 
            onClick={() => setSelectedItem(currentItem)}
            className='w-20 h-12 bg-[#B8F890] hover:bg-[#98d572] px-4'
          >
            Legg til
          </button>
        </div>
          <div
            ref={dragHandleRef}
            className="p-3 w-40 z-10 -translate-1/2 left-1/2 cursor-grab relative flex justify-center items-center"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          ><span className='bg-black w-20 p-1 pointer-events-none rounded'></span></div>
          <div className="p-4 mt-10">
            <h2 className="text-3xl font-bold mb-3">{currentItem.name}</h2>
            <p className="text-base mb-4">{currentItem.description}</p>
            <h3 className="text-lg font-semibold">Ingredienser:</h3>
            <p className="text-sm ">{currentItem.ingredients}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;