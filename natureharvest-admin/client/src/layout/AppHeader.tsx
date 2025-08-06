import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";
import UserDropdown from "../components/header/UserDropdown";
import NotificationDropdown from "../components/header/NotificationDropdown";

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-white dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              document.querySelector("body")?.classList.toggle("sidebar-collapse");
            }}
            className="z-99999 border-stroke dark:border-gray-200 dark:bg-white lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-logo-black delay-[0] duration-200 ease-in-out dark:bg-logo-black !w-full delay-300 group-hover:bg-logo-red"></span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-logo-black delay-150 duration-200 ease-in-out dark:bg-logo-black !w-full delay-400 group-hover:bg-logo-red"></span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-logo-black delay-200 duration-200 ease-in-out dark:bg-logo-black !w-full delay-500 group-hover:bg-logo-red"></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img
              width={32}
              height={32}
              src="/images/logo/logo.png"
              alt="Nature Harvest"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <NotificationDropdown />
            </li>
            <li>
              <UserDropdown user={user} onLogout={handleLogout} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
