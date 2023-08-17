import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { UserContext } from "../UserContext"
import { useContext } from "react"
import RestaurantImage from "../RestaurantImage"
import {format} from "date-fns"
import { Navigate } from "react-router"

export default function ReservationsPage() {

    const [userReservations, setReservations] = useState([])
    const {user, setUser} = useContext(UserContext)

    if(!user) {
       return <Navigate to={'/register'} />
    }

    const queryParams = {
        userId: user._id,
    };




    useEffect(() => {
        axios.get('/reservation', {params: queryParams}).then(response => {
            setReservations(response.data)
        })
    }, [])

    return(
        <div>
            <div className="mt-5">
                {userReservations?.length > 0 && userReservations.map(userReservation => (
                    <div className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden mb-8 h-full">
                        <div className="h-48 w-72">
                            <RestaurantImage restaurant={userReservation.restaurant} />
                        </div>
                        <div className="py-2">
                            <h2 className="text-xl font-bold">{userReservation.restaurant.name}</h2>
                            <div className="flex mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>

                                <h3>{format(new Date(userReservation.dineDate), 'yyyy-MM-dd')}</h3>
                            </div>

                            <div className="flex mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h3>{userReservation.dineTime}</h3>
                            </div>
                            <h3><span className="font-bold">Reservation Name:</span> {userReservation.reservationName}</h3>
                            <h3><span className="font-bold">Number of People:</span> {userReservation.reservationPeople}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {userReservations?.length === 0 && (
                <div className="text-center">
                    <p className="font-bold">No reservations found</p>
                </div>
            )}

        </div>
    )
}