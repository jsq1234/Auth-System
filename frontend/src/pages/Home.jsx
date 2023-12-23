import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const serverUrl = "http://localhost:8000"

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get('jwt');
      if (token) {
        try {
          const res = await fetch(`${serverUrl}/api/user/info`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });

          const json = await res.json();

          if (res.ok) {
            setUserInfo(json.message);
          }
        } catch (e) {
          console.log(`Error : ${e.message}`);
        }
      }else{
        navigate('/signin');
      }

    }

    fetchUserInfo();
  }, [])

  return (
    <div className='text-2xl mt-10 py-2 px-2 font-semibold'>Got this from API : {userInfo}</div>
  )
}
