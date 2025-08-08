import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  GridIcon, 
  PageIcon, 
  BoxIcon, 
  PlugInIcon, 
  BoxCubeIcon, 
  FolderIcon, 
  ChatIcon,
  ShootingStarIcon,
  ListIcon
} from "../icons";

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <GridIcon className="fill-current" width="18" height="18" />,
      path: "/",
    },
    {
      title: "Blog Posts",
      icon: <PageIcon className="fill-current" width="18" height="18" />,
      path: "/blog",
    },
  {
      title: "Products",
      icon: <BoxIcon className="fill-current" width="18" height="18" />,
      path: "/products",
    },
    {
      title: "Services",
      icon: <PlugInIcon className="fill-current" width="18" height="18" />,
      path: "/services",
    },
    {
      title: "Brands",
      icon: <BoxCubeIcon className="fill-current" width="18" height="18" />,
      path: "/brands",
    },
    {
      title: "Categories",
      icon: <FolderIcon className="fill-current" width="18" height="18" />,
      path: "/categories",
    },
    {
      title: "Flavors",
      icon: <ShootingStarIcon className="fill-current" width="18" height="18" />,
      path: "/flavors",
    },
    {
      title: "Sizes",
      icon: <ListIcon className="fill-current" width="18" height="18" />,
      path: "/sizes",
    },
    {
      title: "Messages",
      icon: <ChatIcon className="fill-current" width="18" height="18" />,
      path: "/messages",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-9999 flex h-screen w-[280px] flex-col overflow-y-hidden bg-[#e5e7d2] duration-300 ease-linear dark:bg-[#e5e7d2] lg:static lg:translate-x-0">
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="flex items-center">
                      <img 
              src="/images/logo/logo.png" 
              alt="Nature Harvest" 
              className="h-16 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          <span className="ml-3 text-xl font-bold text-black hidden">Nature Harvest</span>
        </NavLink>

            <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            document.querySelector("body")?.classList.toggle("sidebar-collapse");
          }}
          className="block lg:hidden"
        >
          <svg className="fill-current text-black" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.21248 17.625 9.36248 17.4375C9.69998 17.1 9.69998 16.575 9.36248 16.2375L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill=""/>
          </svg>
            </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black">MENU</h3>

            <ul className="mb-6 flex flex-col gap-2.5">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-logo-red hover:text-white ${
                      location.pathname === item.path && "bg-logo-red text-white"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </NavLink>
                  </li>
                ))}
              </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
