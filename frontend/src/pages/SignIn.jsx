import React from 'react'
import { Link } from 'react-router-dom'
import googleLogo from '../assets/google_logo.svg';
import githubLogo from '../assets/github_logo.svg';
import { useForm } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';
import { githubAuthUrl, googleAuthUrl } from '../constants';
import Cookies from 'js-cookie';
import useSignIn from '../hooks/useSignIn';

const temp = 'flex items-center justify-center gap-4 border-2 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-300 border-gray-100 w-full rounded-lg p-4 font-medium'

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { incorrectEmail, incorrectPassword, signin, loading } = useSignIn();

    const onSubmit = async (data) => {
        Cookies.remove('jwt');
        await signin(data.email, data.password);
    }

    const googleClick = () => {
        Cookies.remove('jwt');
        window.open(googleAuthUrl, "_self");
    }

    const githubClick = () => {
        Cookies.remove('jwt');
        window.open(githubAuthUrl, "_self");
    }

    return (
        <div className="w-screen h-full bg-sign-in bg-cover">
            <div className='flex items-center w-screen h-screen xl:max-w-screen-sm sm:shadow-2xl sm:shadow-blue-400 bg-slate-900 sm:bg-blue-950 dark:text-gray-200'>
                <div className='bg-slate-900 py-8 rounded-2xl mx-auto w-screen sm:w-3/4 min-h-fit sm:border-2 sm:border-slate-200'>
                    <h1 className='text-4xl font-bold max-w-fit mx-auto font-serif'>Log in to your account</h1>
                    <h1 className='mt-2 text-2xl max-w-fit mx-auto font-serif'>Don't have an account? <Link to="/signup" className='font-semibold text-sky-400'>Sign Up</Link></h1>

                    {/* Google/Github SignIn buttons */}

                    <div className='flex gap-4 flex-col mx-auto w-3/4 mt-5 text-2xl'>
                        <Link to="/" >
                            <button className={temp} onClick={googleClick}>
                                <img src={googleLogo} width={32} height={32} alt='google logo' />
                                Google
                            </button>
                        </Link>
                        <Link to="/">
                            <button className={temp} onClick={githubClick}>
                                <img src={githubLogo} width={32} height={32} alt='google logo' />
                                Github
                            </button>
                        </Link>
                    </div>

                    <div className='relative w-full text-xl mt-8'>
                        <div className='max-w-fit p-2 text-md mx-auto rounded-full bg-slate-600 z-2'>Or</div>
                    </div>
                    <div className='w-3/4 mx-auto mt-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor='email' className='block text-lg mb-1 ml-1 font-medium'>Email Address</label>
                                <input
                                    type="email"
                                    placeholder='email address'
                                    {...register("email", { required: true })}
                                    className={`rounded-lg outline-none focus:outline-none mb-2 w-full text-black px-2 py-1 text-lg focus:ring-4 focus:ring-sky-400 focus:bg-slate-100 ${errors.email && "ring-2 ring-red-500"}`} />
                                {errors.email && <span className='text-red-500 text-lg font-semibold ml-1 flex items-center gap-3 mt-1'><AlertTriangle /> Email is required.</span>}
                                {incorrectEmail && <span className='text-red-500 text-lg font-semibold ml-1 flex items-center gap-3 mt-1'><AlertTriangle />Email doesn't exist.</span>}
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-lg mb-1 ml-1 font-medium'>Password</label>
                                <input
                                    type="password"
                                    placeholder='password'
                                    {...register("password", { required: true })}
                                    className={`rounded-lg outline-none focus:outline-none mb-2 w-full text-black px-2 py-1 text-lg focus:ring-4 focus:ring-sky-400 focus:bg-slate-100 ${errors.password && "ring-2 ring-red-500"}`} />
                                {errors.password && <span className='text-red-500 text-lg font-semibold ml-1 flex items-center gap-3 mt-1'><AlertTriangle /> Password is required.</span>}
                                {incorrectPassword && <span className='text-red-500 text-lg font-semibold ml-1 flex items-center gap-3 mt-1'><AlertTriangle /> Incorrect password.</span>}
                            </div>
                            <button type="submit"
                            className='mt-8 text-2xl border-2 border-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-white'>
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
