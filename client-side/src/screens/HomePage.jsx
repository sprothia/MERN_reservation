import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import axios from "axios"

export default function IndexPage() {
   const [restaurants, setRestaurants] = useState([]);
   const [query, setQuery] = useState('')

   useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await axios.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDocuments();
  }, []);


    return (
      <>
        <div className="mt-3">
          <input type="text" placeholder="Search Location Ex: San Ramon" className="search" onChange={(e) => setQuery(e.target.value)} />     
        </div>
        <div className="mt-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {restaurants.length > 0 && restaurants.filter(restaurant => restaurant.address.toLowerCase().includes(query)).map((restaurant, index) => (
            <Link key={restaurant._id} to={'/restaurants/'+restaurant._id} className="pl-12">
                <div className="rounded-2xl mb-2 flex w-72 h-72">
                    {restaurant.photos && (
                      <img className="rounded-2xl object-cover aspect-square shadow-md hover:shadow-xl transition duration-300" src={restaurant.photos} alt="" />
                    )}
                  </div>
                  <div class="flex items-center justify-between mr-3">
                    
                  </div>
                  <h3 className="font-bold trucnate">{restaurant.name}</h3>
                  <div class="flex items-center justify-between mr-3">
                      <h1 class="flex-1 text-left">{restaurant.timings}</h1>
                      <h2 class="text-middle">{restaurant.ratings}</h2>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <h3 className="text-sm">{restaurant.address}</h3>
                </Link>
              ))} 
        </div>               

      </>
      
    )
}