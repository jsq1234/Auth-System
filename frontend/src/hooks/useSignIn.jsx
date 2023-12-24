import { login } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../constants';
import { useState } from 'react';

export default function useSignIn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const navigate = useNavigate();

    const signin = async (email, password) => {
        setLoading((_) => true);

        const response = await fetch(`${serverUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const json = await response.json();

        if (!response.ok) {
            if (json.Error.includes('email')) {
                console.log("Incorrect email!");
                setIncorrectEmail((email) => true);
            }
            if (json.Error.includes('password')) {
                setIncorrectPassword((password) => true);
            }
            setLoading((_) => false);
            return ;
        }

        localStorage.setItem('user', JSON.stringify(json));
        setLoading((loading) => !loading);
        setIncorrectEmail((_) => false);
        setIncorrectPassword((_) => false);
        dispatch(login());
        navigate('/');
    }

    return { incorrectEmail, incorrectPassword, signin, loading };
}
