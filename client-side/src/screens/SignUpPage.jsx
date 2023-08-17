import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function SignUpPage() {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function createUser(e) {
        e.preventDefault()
        try {
            await axios.post('/register', {
                name, email, password,
            })
    
            alert('You have registered succesfully')
        } catch (signUpError) {
            alert('Could not register. Try again later')
        }
        
    }

    return (
    <div className="mt-5 grow flex items-center justify-around">
        <div className="-mt-20">
            <h1 className="text-5xl text-center mb-10"> Signup </h1>
            <form className="max-w-md mx-auto" onSubmit={createUser}>
                <input type='text' placeholder='Enter full name' value={name} onChange={e => setName(e.target.value)}/>
                <input type='email' placeholder='Enter email address' value={email}  onChange={e => setEmail(e.target.value)}/>
                <input type='password' placeholder='Create a password' value={password}  onChange={e => setPassword(e.target.value)}/>
                <button className="primary">Signup</button>
                <div className="text-center py-4 text-gray-400">
                      Already have an account? <Link className="text-black" to={'/signin'}> Sign In Now </Link>
                </div>
            </form>
        </div>
    </div>
    )
}