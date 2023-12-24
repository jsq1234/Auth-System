import React, { useState } from 'react'
import { Menu } from 'lucide-react';
import reactLogo from "../assets/react.svg";
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';
import { useSelector } from 'react-redux';


export default function Navbar() {
    const [expanded, setExpanded] = useState(false);
    const auth = useSelector(state => state.auth);

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 border-gray-200 dark:border-gray-600 text-xl">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={reactLogo} className="h-10 w-14" alt="Flowbite Logo" />
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Demo App</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {auth.isAuthenticated ? <UserMenu /> : <SignInButton />}
                    <button onClick={() => setExpanded(!expanded)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <Menu />
                    </button>
                </div>
                <div className={`items-center justify-between ${expanded ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
