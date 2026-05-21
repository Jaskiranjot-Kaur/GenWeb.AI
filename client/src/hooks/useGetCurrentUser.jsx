import {useEffect} from 'react'
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const serverUrl = 'http://localhost:8000';

function useGetCurrentUser() {
    const dispatch = useDispatch();
    useEffect(()=> {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/me`, {withCredentials:true});
                dispatch(setUserData(result.data.user ?? result.data));
            }
            catch(error) {
                console.log("full error:", error);
                console.log("message:", error.message);
                console.log("code:", error.code);
                console.log("response:", error.response?.data);
            }
        }
        getCurrentUser();
    },[dispatch])
}

export default useGetCurrentUser;