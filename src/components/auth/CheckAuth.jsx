import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CheckAuth({action}) {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (action == 'isLogin') {
            if (!auth?.id) {
                navigate('/auth/login');
            }
        }
        if (action == 'isLogout') {
            if (auth?.id) {
                navigate('/admin');
            }
        }
    }, [])
}