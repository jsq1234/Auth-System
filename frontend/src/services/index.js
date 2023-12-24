import Cookies from "js-cookie";
import { serverUrl } from "../constants";

/*  
    This is used to fetch user{ email, username } from the backend 
    Use this after every page refresh.
*/

export async function fetchUserInfo() {
    const jwtToken = Cookies.get('jwt');

    if (!jwtToken) {
        return null;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return user;
    }

    const response = await fetch(`${serverUrl}/api/user/info`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    });

    if (!response.ok) {
        return null;
    }

    const json = await response.json();

    localStorage.setItem('user', JSON.stringify(json));

    return json;
}

