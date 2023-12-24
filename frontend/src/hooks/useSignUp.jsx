import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../constants';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function useSignUp() {
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (email, password) => {
        setLoading(true);
        const response = await fetch(`${serverUrl}/auth/signin`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

        const json = await response.json();

        if (!response.ok) {
            if (json.Error.includes("exists")) {
                setRegistered(true);
            }
            setLoading(false);
            return;
        }

        localStorage.setItem('user', JSON.stringify(json));
        setRegistered(false);
        setLoading(false);
        navigate('/');
        dispatch(login());
    }

    return { registered, loading, signup };
}
