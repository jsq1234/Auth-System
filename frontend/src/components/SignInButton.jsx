import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function SignInButton() {
    return (
        <Link to="/signin">
            <button type="button" className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In <ArrowRight strokeWidth={3} /></button>
        </Link>
    )
}
