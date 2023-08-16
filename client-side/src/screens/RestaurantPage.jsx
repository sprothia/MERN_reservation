import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router"
import { UserContext } from "../UserContext"

export default function RestaurantPage() {
    const {id} = useParams()
    const[restaurant, setRestaurant] = useState(null)
    const [reservationPeople, setReservationPeople] = useState(1)
    const [dineDate, setDineDate] = useState('')
    const [dineTime, setDineTime] = useState('')
    const [reservationName, setReservationName] = useState('')
    const [phomeNumber, setPhoneNumber] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user, setUser} = useContext(UserContext)


    useEffect(() => {
        if(!id) {
            return;
        }

        axios.get(`http://localhost:4000/restaurants/${id}`).then(response => {
            setRestaurant(response.data)
        })

    }, [id])


    async function makeReservation() {
        const response = await axios.post('http://localhost:4000/reservation',
        {dineDate, dineTime, reservationName, phomeNumber, reservationPeople, restaurant: restaurant._id, user: user._id})
        
        const reservationId = response.data._id
        setRedirect(`/reservation`)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    if(!restaurant) return ''

    return(
        <div className="mt-5 -mx-8 px-8">
            <div className="text-4xl font-bold mb-5">
                <h1>{restaurant.name}</h1>
            </div>
            

            <div className="flex w-1/3 items-center justify-between">

               <h3 className="mr-10">{restaurant.timings}</h3>
               <a className='underline mr-10' target='_blank' href={"https://maps.google.com/?q=" + restaurant.address}>{restaurant.address}</a>
               <div className="flex">
                    <h2 class="text-middle">{restaurant.ratings}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
               </div>
               

            </div>


            <div className="flex">

                <div className="w-1/3">
                    <img className="mt-5 mr-5 rounded-2xl object-cover aspect-square w-full h-full" src={restaurant.photos} />
                </div>

                <div className="ml-6 w-2/3">
                    
                    <div>
                        <h1 className="mt-5 font-bold text-2xl">About</h1>
                        <p className="mt-5">{restaurant.description}</p>
                        <h1 className="mt-5 font-bold text-2xl">Pictures</h1>
                        <div className="mt-5 grid grid-cols-5 gap-4">
                            {restaurant.menu_items.map((url, index) => (
                                <div key={index} className="relative w-5/6 h-0 pb-[80%]">
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            ))}
                       </div>

                       <div className="mt-20 bg-gray-100 shadow p-4 rounded-2xl">

                            <div  className="flex items-center justify-between">
                                <div className="mr-12 text-center">
                                    <label className="font-bold">Date </label>
                                    <input type="date" value={dineDate} onChange={e => setDineDate(e.target.value)} />
                                </div>

                                <div className="mr-4 text-center">
                                    <label className="font-bold">Time </label>
                                    <input type="time" value={dineTime} onChange={e => setDineTime(e.target.value)} />
                                </div>

                                <div className="text-center">
                                    <label className="font-bold">Number of People </label>
                                    <input onChange={e => setReservationPeople(e.target.value)} type="number" value={reservationPeople} />
                                </div>

                                <div className="ml-[-14px] text-center">
                                    <label className="font-bold">Reservation Name </label>
                                    <input onChange={e => setReservationName(e.target.value)} type="name" value={reservationName} />
                                </div>

                                <div className="mr-5 text-center">
                                    <label className="font-bold">Phone Number </label>
                                    <input onChange={e => setPhoneNumber(e.target.value)} type="name" value={phomeNumber} />
                                </div>

                                
                            </div>

                            <div className="flex justify-center mt-5">
                                <button onClick={makeReservation} className="bg-pink rounded-full py-5 px-24">Make Reservation</button>
                            </div>
            
                       </div>


                    </div>

                </div>
            </div>

        </div>
    )
}