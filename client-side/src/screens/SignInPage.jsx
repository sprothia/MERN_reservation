import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function SignInPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)

    async function signInUser(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post('/signin', {email, password})
            { /* This returns the UserDoc which is Json response in login of index.js */}
            setUser(data)
            setRedirect(true)
        } catch (signInError) {
            alert('Could not try logging in. Try again later')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return(
        <div className="mt-5 grow flex items-center justify-around">
            <div className="-mt-20">
                <h1 className="text-5xl text-center mb-10"> Login </h1>
                <form className="max-w-md mx-auto" onSubmit={signInUser}>
                    <input type='email' placeholder='Enter email address' value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-4 text-gray-400">
                          Don't have an account? <Link to={'/register'} className="text-black"> Register Now </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
