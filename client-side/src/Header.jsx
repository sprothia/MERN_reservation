import { useContext } from "react";
import { Form, Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import { useEffect } from "react";
import { useState } from "react";
export default function Header() {

    const {user} = useContext(UserContext)
    
    return(
        <div className="mt-[-14px]">
            <header className='flex justify-between'>
                {/* Icon*/}
                <Link to={'/'} className="mt-5">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>


                </Link>
                

                <Link to='/reservation' className="ml-12 bg-pink text-white font-semibold py-5 px-5 rounded-full shadow-md hover:shadow-lg transition duration-300">
                    My Reservations
                </Link>

                <Link to='/places' className="border border-gray-300 rounded-full py-3 px-3 shadow-md hover:shadow-lg transition duration-300">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </Link>

                {/* Account Button */}
                <Link to={user ? '/account':'/signin'} className='flex gap-3 border border-gray-300 rounded-full py-5 px-3 shadow-md hover:shadow-lg transition duration-300'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>

                    {!!user && (
                        <div>{user.name}</div>
                    )}

                </Link>
            </header>
            
        </div>
    )
}