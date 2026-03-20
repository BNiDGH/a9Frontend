// components/CardPanel.tsx
'use client';
import { useReducer } from 'react';
import Card from './Card';
import Link from 'next/link';

const mockVenues = [
  { vid: '001', name: 'The Bloom Pavilion', imgSrc: '/img/bloom.jpg' },
  { vid: '002', name: 'Spark Space', imgSrc: '/img/sparkspace.jpg' },
  { vid: '003', name: 'The Grand Table', imgSrc: '/img/grandtable.jpg' },
];

type RatingAction = 
  | { type: 'SET_RATING'; venue: string; rating: number }
  | { type: 'REMOVE_RATING'; venue: string };

function ratingReducer(state: Map<string, number>, action: RatingAction) {
  switch (action.type) {
    case 'SET_RATING': {
      const newState = new Map(state);
      newState.set(action.venue, action.rating);
      return newState;
    }
    case 'REMOVE_RATING': {
      const newState = new Map(state);
      newState.delete(action.venue);
      return newState;
    }
    default:
      return state;
  }
}

export default function CardPanel() {
  const initialMap = new Map<string, number>();
  const [ratingMap, dispatch] = useReducer(ratingReducer, initialMap);

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10 w-full justify-items-center">
        {mockVenues.map((venue) => (
          <Link href={`/venue/${venue.vid}`} key={venue.vid} className="w-full">
            <Card 
              venueName={venue.name}
              imgSrc={venue.imgSrc}
              onRatingChange={(venueName, rating) => 
                dispatch({ type: 'SET_RATING', venue: venueName, rating })
              }
            />
          </Link>
        ))}
      </div>
      
      <div className="p-5 border border-gray-300 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-black">
          Venue List with Ratings : {ratingMap.size}
        </h2>
        
        <div className="flex flex-col gap-2">
          {Array.from(ratingMap.entries()).map(([venue, rating]) => (
            <div 
              key={venue} 
              data-testid={venue}
              onClick={() => dispatch({ type: 'REMOVE_RATING', venue })} 
              className="cursor-pointer p-3 rounded-md bg-gray-50 border border-gray-200 text-black hover:bg-gray-100 transition-colors"
            >
              {venue} : {rating}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}