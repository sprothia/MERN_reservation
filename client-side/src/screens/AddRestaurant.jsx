import { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios"

export default function PlacesFormPage() {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [photos, setPhotos] = useState('')
    const [description, setDescription] = useState('')
    const [timings, setTimings] = useState('')
    const [ratings, setRatings] = useState('')
    const [menuItemOne, setMenuItemOne] = useState('')
    const [menuItemTwo, setMenuItemTwo] = useState('')
    const [menuItemThree, setMenuItemThree] = useState('')
    const [menuItemFour, setMenuItemFour] = useState('')
    const [menuItemFive, setMenuItemFive] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        let menu_items = [menuItemOne, menuItemTwo, menuItemThree, menuItemFour, menuItemFive]

        if(name !== '' && address !== '' && photos !== '' && description !== '' && timings !== '' && ratings !== '' && menuItemOne !== '' && menuItemTwo !== '' && menuItemThree !== '' && menuItemFour !== '' && menuItemFive !== '') {
            try {
                axios.post('http://localhost:4000/places', {
                    name, address, photos, description, timings, ratings, menu_items
                })
                setRedirect(true)
                alert('You have added a restaurant')

            } catch (signUpError) {
                alert('Could not process. Try again later')
            }
        } else {
            alert('Please enter all data')
        }

    }

    if(redirect) {
        return <Navigate to='/' />
    }
        
        
   
    return (
      <div>
        <h1 className="mt-5 mb-5 text-3xl font-bold">Restaurant Information Form</h1>
        <form onSubmit={handleSubmit}>

            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>

                <label className="font-bold ml-3">
                Name:
                </label>
            </div>

            <input placeholder='Ex: Tommys Tacos' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />


            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>

                <label className="font-bold ml-3">
                Address:
                </label>

            </div>


            <input placeholder='Ex: 123 Main St, San Ramon, CA' type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br />

            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>


                <label className="font-bold ml-3">
                Photos:
                </label>

            </div>

            <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="photos" value={photos} onChange={(e) => setPhotos(e.target.value)} />
            <br />

            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>

                <label className="font-bold ml-3">
                Description:
                </label>

            </div>


            <input placeholder="Please Enter A Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />

            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <label className="font-bold ml-3">
                Timings:
                </label>

            </div>


            <input placeholder="Ex: 10AM-9PM" type="text" name="timings" value={timings} onChange={(e) => setTimings(e.target.value)} />
            <br />

            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>

                <label className="font-bold ml-3">
                Ratings:
                </label>

            </div>


            <input placeholder="Ex: 4.8" type="text" name="ratings" value={ratings} onChange={(e) => setRatings(e.target.value)} />
            <br />

            <div className="flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>

                <label className="font-bold ml-3">
                Menu Items:
                </label>

            </div>

            <div>
                <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="menuItems" value={menuItemOne} onChange={(e) => setMenuItemOne(e.target.value)} />
                <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="menuItemsTwo" value={menuItemTwo} onChange={(e) => setMenuItemTwo(e.target.value)} />
                <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="menuItemsThree" value={menuItemThree} onChange={(e) => setMenuItemThree(e.target.value)} />
                <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="menuItemsFour" value={menuItemFour} onChange={(e) => setMenuItemFour(e.target.value)} />
                <input placeholder='Please Enter A URL Address Ex: https://' type="text" name="menuItemsFive" value={menuItemFive} onChange={(e) => setMenuItemFive(e.target.value)} />
            </div>
            <br />
            
            <button className="bg-pink hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out shadow-md" type="submit">Submit</button>
        </form>
      </div>
    );
}