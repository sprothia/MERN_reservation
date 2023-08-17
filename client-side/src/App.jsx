import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import SignInPage from './screens/SignInPage';
import Layout from './Layout';
import SignUpPage from './screens/SignUpPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { useEffect } from 'react';
import Account from './screens/Account';
import RestaurantPage from './screens/RestaurantPage';
import ReservationsPage from './screens/ReservationsPage';
import ReservationPage from './screens/ReservationPage';
import AddRestaurant from './screens/AddRestaurant';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

function App() {

  return (
    <>
     <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Home Page is a nested route, so it will render under layout as long as path is /*/}
           <Route index element={<HomePage />} />
           <Route path='/signin' element={<SignInPage />} />
           <Route path='/register' element={<SignUpPage />} />
           <Route path='/account' element={<Account />} />
           <Route path='/restaurants/:id' element={<RestaurantPage />}/>
           <Route path='/reservation' element={<ReservationsPage />} />
           <Route path='/places' element={<AddRestaurant />} />
        </Route>
      </Routes>
     </UserContextProvider>
    </>
  )
}

export default App
