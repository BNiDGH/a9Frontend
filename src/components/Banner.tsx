'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const router = useRouter();
  
  const { data: session } = useSession(); 
  
  const covers = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];
  
  const [index, setIndex] = useState(0);

  return (
    <div 
      className={styles.banner} 
      onClick={() => setIndex((prev) => (prev + 1) % 4)}
      style={{ cursor: 'pointer' }}
    >
      <Image 
        src={covers[index]} 
        alt='cover' 
        fill={true}
        className="object-cover"
      />
      
      <div className={styles.bannerText}>
        <h1 className='text-4xl'>where every event finds its venue</h1>
        <h3 className='text-xl'>you can't take care pet if you can't talk to us</h3>
      </div>
      
      {session ? (
        <div className="absolute top-4 right-4 z-20 text-slate-800 text-lg font-semibold bg-white bg-opacity-80 px-4 py-2 rounded-md shadow-sm">
          Welcome {session.user?.name || "User"}
        </div>
      ) : null}
      
      <button 
        className="absolute bottom-5 right-5 bg-white text-black px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100 z-20"
        onClick={(e) => {
          e.stopPropagation();
          router.push('/venue');
        }}
      >
        Select Venue
      </button>
    </div>
  );
}