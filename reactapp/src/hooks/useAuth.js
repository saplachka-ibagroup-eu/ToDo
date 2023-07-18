import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from '../redux/actions/authActions';

export const useAuth = () => {
    const token = localStorage.getItem("idToken");
    const dispatch = useDispatch();
    useEffect(() => {
        token && dispatch(fetchCurrentUser());
    }, [token]);
    return token;
};