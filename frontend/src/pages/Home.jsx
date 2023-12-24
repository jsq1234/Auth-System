import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../services';
import { login } from '../redux/authSlice';

export default function Home() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await fetchUserInfo();
        console.log("Checkin!");
        if (!user) {
          navigate('/signin');
          return;
        }

        dispatch(login(user));
      } catch (error) {
        console.log(`Error from loading initial Auth : ${err}`);
      }
    };

    console.log(`Is authenticated ? ${auth.isAuthenticated}`);
    // Perform initial auth check if not authenticated
    if (!auth.isAuthenticated) {
      initializeAuth();
    }
  }, [auth.isAuthenticated, dispatch, navigate]);
  
  return (
    <div className='text-2xl mt-10 py-2 px-2 font-semibold'>Got this from API</div>
  )
}
