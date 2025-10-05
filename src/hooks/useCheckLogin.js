// hooks/useCheckLogin.ts
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from '@/services/services';
import { setIsLoggedIn, setUser } from '@/store/appSlice';

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = getCookie("token");
    const user = getCookie("user");
    console.log("useruseruser ",user);
    
    dispatch(setIsLoggedIn(!!token)); // true nếu token tồn tại
    if(user && typeof user!="undefined" && user!="undefined"){
        dispatch(setUser(JSON.parse(user)));
    }
  
    setLoading(false); // xong
  }, [dispatch]);
  return loading;
};
