import React from 'react'
import { login } from '../src/redux/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const serverUrl = process.env.SERVER_URL;

export default function useLogin() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (email, password) => {
        setLoading(true);
        const response = await fetch(`${serverUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        
        const json = await response.json();

        if(!response.ok){
            setError(json.Error);
        }

    }
    return (
        <div>useLogin</div>
    )
}
