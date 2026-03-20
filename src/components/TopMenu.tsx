import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className={`${styles.menucontainer} flex flex-row items-center w-full px-10 justify-between h-16`}>
            
            <div className="flex flex-row items-center ">
                {session ? (
                    <Link href="/api/auth/signout">
                        <div className="text-cyan-600 text-sm font-semibold hover:text-cyan-800 transition-colors">
                            Sign-Out
                        </div>
                    </Link>
                ) : (
                    <Link href="/api/auth/signin">
                        <div className="text-cyan-600 text-sm font-semibold hover:text-cyan-800 transition-colors">
                            Sign-In
                        </div>
                    </Link>
                )}
            </div>

            <div className="flex flex-row items-center space-x-4">  
                <TopMenuItem title='Booking' pageRef='/booking' />
                <Image 
                    src={'/img/logo.png'} 
                    className="h-10 w-10 object-contain" 
                    alt='logo' 
                    width={40}
                    height={40}
                    priority 
                />
            </div>
            
        </div>
    )
}