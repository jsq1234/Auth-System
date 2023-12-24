import Cookies from "js-cookie";
import { serverUrl } from "../src/constants";
import { useNavigate } from "react-router-dom";

export const fetchUserInfo = async () => {
    const navigate = useNavigate();
    const token = Cookies.get('jwt');
    try {
        if (token) {
            const response = await fetch(`${serverUrl}/api/user/info`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (!response.ok) {

            }
        } else {
            navigate('/signin');
        }
    } catch (err) {
        console.log(`Error : ${err.message}`);
    }

}