import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '../apiCalls/users'
import { setUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from '../redux/loaderSlice';

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        dispatch(setUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        dispatch(HideLoading());
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }

  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i className="ri-home-4-line"></i>,
      onclick: () => navigate("/")
    },
    {
      title: "Reports",
      paths: ["/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/reports")
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile")
    },
    {
      title: "LogOut",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login")
      }
    }
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      icon: <i className="ri-home-4-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <i className="ri-file-list-line"></i>,
      onClick: () => navigate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/admin/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/exams/edit") &&
        paths.includes("/admin/exams")
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <div className='layout'>
      <div className='flex gap-2 w-full h-full h-100'>
        <div className='sidebar text-white'>
          <div className='menu'>
            {
              menu.map((item, index) => {
                return <div className=
                  {`menu-item ${getIsActiveOrNot(item.paths) && "active-menu-item"
                    }`}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
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