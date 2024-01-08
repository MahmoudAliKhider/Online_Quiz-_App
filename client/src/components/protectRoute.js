import React, { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInfo } from '../apiCalls/users'
import { setUser } from "../redux/userSlice";

const ProtectRoute = ({ children }) => {
const {user }= useSelector((state) => state.users);

  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();

      if (response.success) {
        message.success(response.message);
        dispatch(setUser(response.data))
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }

  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
    {user?.name}
      
      {children}</div>
  )
}

export default ProtectRoute