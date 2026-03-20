'use client';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function Card({ 
  venueName, 
  imgSrc,
  onRatingChange 
}: { 
  venueName: string; 
  imgSrc: string;
  onRatingChange?: (venue: string, rating: number) => void;
}) {
  const [rating, setRating] = useState<number | null>(0);

  return (
    <InteractiveCard>
      <div className="w-[300px] h-[320px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        
        <div className="w-full h-[70%] relative bg-gray-100">
          <Image 
            src={imgSrc}
            alt='Product Picture'
            fill={true}
            className="object-cover"
          />
        </div>
        
        <div className="w-full h-[30%] p-4 text-black flex flex-col justify-center items-start">
          <div className="mb-2 font-medium">{venueName}</div>
          
          {onRatingChange ? (
             <Rating
               id={`${venueName} Rating`}
               name={`${venueName} Rating`}
               data-testid={`${venueName} Rating`}
               value={rating}
               onChange={(event, newValue) => {
                 setRating(newValue);
                 if (newValue !== null && onRatingChange) {
                   onRatingChange(venueName, newValue);
                 }
               }}
               onClick={(e) => e.stopPropagation()} 
             />
          ) : null}
        </div>
      </div>
    </InteractiveCard>
  );
}