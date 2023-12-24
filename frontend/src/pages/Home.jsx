import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const serverUrl = "http://localhost:8000"

export default function Home() {
  return (
    <div className='text-2xl mt-10 py-2 px-2 font-semibold'>Got this from API</div>
  )
}
