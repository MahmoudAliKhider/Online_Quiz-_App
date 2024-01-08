import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '../apiCalls/users'
import { setUser } from "../redux/userSlice";

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await getUserInfo();

      if (response.success) {
        // message.success(response.message);
        dispatch(setUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
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

  const userMenu = [
    {
      name: "Home",
      paths: ["/"],
      icon: <i className="ri-home-4-line"></i>,
      onclick: () => navigate("/")
    },
    {
      name: "Reports",
      paths: ["/reports"],
      icon: <i className="ri-file-chart-line"></i>,
      onClick: () => navigate("/reports")
    },
    {
      name: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-file-user-line"></i>,
      onClick: () => navigate("/profile")
    },
    {
      name: "LogOut",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login")
      }
    }
  ];

  const adminMenu = [];

  const atchiveRoute = window.location.pathname;

  return (
    <div className='layout'>
      <div className='flex gap-2 w-full h-full h-100'>
        <div className='sidebar text-white'>
          <div className='menu'>
            {
              menu.map((item, index) => {
                return <div className=
                  {`menu-item ${atchiveRoute === item.paths[0] && "active-menu-item"}`}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </div>
              })
            }
          </div>
        </div>
        <div className='body'>
          <div className='header flex justify-between'>

            {!collapsed && <i className="ri-close-circle-line"
              onClick={() => setCollapsed(true)}>
            </i>
            }

            {collapsed && <i className="ri-close-circle-line"
              onClick={() => setCollapsed(false)}>
            </i>
            }

            <h1 className='text-2xl '>Master Quiz</h1>
            <div>
              <div className="flex gap-1 items-center">
                <h1 className="text-md text-white">{user?.name}</h1>
              </div>
              <span>Role : {user?.isAdmin ? "Admin" : "User"}</span>
            </div>

          </div>
          <div className='content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectRoute