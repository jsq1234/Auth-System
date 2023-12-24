import React, { useState } from 'react'
import { User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logout } from '../redux/authSlice';

export function UserMenuItem({ to, children }) {
    return (
        <li>
            <Link to={to} className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{children}</Link>
        </li>
    )
}

export default function UserMenu({ user }) {
    const [expanded, setExpanded] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const signOutUser = () => {
        console.log(dispatch);
        Cookies.remove('jwt');
        localStorage.removeItem('user');
        console.log('removing cookies and localStorage stuffs');
        dispatch(logout());
    }


    return (
        <div className='relative'>
            <button onClick={() => setExpanded(!expanded)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                {auth.isAuthenticated ? <img src={auth.user.avatar} className='rounded-full w-11 h-11' /> :
                    <User2 className='bg-white w-12 h-12 rounded-full' />}
            </button>
            <div className={`absolute z-50 top-full right-0 ${expanded ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-lg text-gray-900 dark:text-white">{auth.isAuthenticated ? auth.user.username : "User Name"}</span>
                    <span className="block text-lg  text-gray-500 truncate dark:text-gray-400">{auth.isAuthenticated ? auth.user.email : "sample@email.com"}</span>
                </div>
                <div className='py-2'>
                    <button className="w-full text-left cursor-pointer block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={signOutUser}>Sign Out</button>
                </div>
            </div>
        </div>

    )
}

