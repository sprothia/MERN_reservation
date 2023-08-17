import axios from "axios"
import { useState } from "react"
import { useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

export default function Account() {
    // const [redirect, setRedirect] = useState(null)
    const {ready, user, setUser} = useContext(UserContext)

    async function signout() {
        await axios.post('/signout', null)
        setUser(null)
    }

    if(!ready) {
        return 'Loading'
    }


    if (ready && !user) {
        return <Navigate to={'/signin'} />
    }

    // if(redirect) {
    //     return <Navigate to={redirect} />
    // }


    return (
      <>

        <div class="w-screen h-64 bg-gradient-to-r from-blue-200 via-purple-400 to-pink-500 mt-5 ml-[-40px]">
            <div className="mt-12 text-6xl font-bold text-center text-white">Profile</div>
        </div>


        <div className="flex-row">

            <div className="mt-10 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-48 h-48">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            </div>

            <div className="mt-5 font-bold flex justify-center">
                <h1 className="text-4xl mb-10">{user?.name}</h1>
            </div>

            <div className="mt-[-20px] font-bold flex justify-center">
                <h1 className="text-2xl mb-10">{user?.email}</h1>
            </div>

        </div>

        <div>

            <div className="w-full flex justify-center mt-6 h-20 w-50">
                <button onClick={signout} className="bg-pink text-center max-w-sm mx-auto w-full border rounded-full">Log Out</button>
            </div>

        </div>

      


      </>
    )
}