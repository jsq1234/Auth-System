import React, { useState } from 'react'
import { User, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserMenuItem({ to, children }){
    return (
        <li>
            <Link to={to} className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{children}</Link>
        </li>
    )
}

export default function UserMenu({ user }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='relative'>
            <button onClick={() => setExpanded(!expanded)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <UserCircle2 className='bg-white w-12 h-12 rounded-full' />
            </button>
            <div className={`absolute z-50 top-full right-0 ${expanded ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-xl text-gray-900 dark:text-white">{user ? user.username : "User Name"}</span>
                    <span className="block text-  text-gray-500 truncate dark:text-gray-400">{user ? user.email : "name@flowbite.com" }</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <UserMenuItem to="/signout" >Sign Out</UserMenuItem>
                </ul>
            </div>
        </div>

    )
}

