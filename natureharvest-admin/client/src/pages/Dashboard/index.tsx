import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PageMeta from "../../components/common/PageMeta";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      title: "Total Products",
      value: "150+",
      change: "+12%",
      changeType: "positive",
      icon: (
        <svg className="fill-current" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.44501L0.581237 8.24876C0.415625 8.03438 0.415625 7.75938 0.581237 7.54501L0.687512 7.34876C0.825012 7.17501 4.19376 0.678126 11 0.678126C17.8063 0.678126 21.175 7.17501 21.3125 7.34876L21.4188 7.54501C21.5844 7.75938 21.5844 8.03438 21.4188 8.24876L21.3125 8.44501C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.85469 7.90001C3.36875 8.71563 5.525 11.8719 11 11.8719C16.475 11.8719 18.6313 8.71563 19.1453 7.90001C18.6313 7.08438 16.475 3.92813 11 3.92813C5.525 3.92813 3.36875 7.08438 2.85469 7.90001Z" fill=""/>
          <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""/>
        </svg>
      ),
    },
    {
      title: "Total Orders",
      value: "1,200+",
      change: "+8%",
      changeType: "positive",
      icon: (
        <svg className="fill-current" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.18418 8.90351H4.77148L9.29844 12.8619L10.9985 11.1575L14.4649 14.6239L13.1994 15.8894L10.9985 13.6885L9.29844 15.3886L4.77148 11.4302H7.18418V8.90351Z" fill=""/>
          <path d="M15.6533 9.26387H17.4569V6.72813H13.5879V4.51562H17.4569V1.98188H15.6533V-0.232422H13.5879V1.98188H9.71688V4.51562H13.5879V6.72813H9.71688V9.26387H13.5879V11.4774H15.6533V9.26387Z" fill=""/>
        </svg>
      ),
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+23%",
      changeType: "positive",
      icon: (
        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10H9V8L13 2H9V0H7V2H3V0H1V2V8V10H3V2H7V8H9V10H21Z" fill=""/>
        </svg>
      ),
    },
    {
      title: "Total Customers",
      value: "2,300+",
      change: "+5%",
      changeType: "positive",
      icon: (
        <svg className="fill-current" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.18418 8.90351H4.77148L9.29844 12.8619L10.9985 11.1575L14.4649 14.6239L13.1994 15.8894L10.9985 13.6885L9.29844 15.3886L4.77148 11.4302H7.18418V8.90351Z" fill=""/>
          <path d="M15.6533 9.26387H17.4569V6.72813H13.5879V4.51562H17.4569V1.98188H15.6533V-0.232422H13.5879V1.98188H9.71688V4.51562H13.5879V6.72813H9.71688V9.26387H13.5879V11.4774H15.6533V9.26387Z" fill=""/>
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: "📦",
      path: "/products/add",
      color: "bg-blue-500",
    },
    {
      title: "Create Blog Post",
      description: "Write a new blog article",
      icon: "✍️",
      path: "/blog/add",
      color: "bg-green-500",
    },
    {
      title: "Add New Service",
      description: "Create a new service offering",
      icon: "🛠️",
      path: "/services/add",
      color: "bg-purple-500",
    },
    {
      title: "View Messages",
      description: "Check customer inquiries",
      icon: "💬",
      path: "/messages",
      color: "bg-orange-500",
    },
  ];

  return (
    <>
      <PageMeta
        title="Nature Harvest Admin Dashboard"
        description="Welcome to Nature Harvest Admin Dashboard - Manage your organic juice business"
      />
      
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Welcome back, {user?.username || "Admin"}! 👋
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {stat.icon}
              </div>

              <div className="mt-4.5 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {stat.value}
                  </h4>
                  <span className="text-sm font-medium">{stat.title}</span>
                </div>

                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === "positive" ? "text-meta-3" : "text-meta-5"
                }`}>
                  {stat.change}
                  <svg className="fill-current" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5.05048 0.0848689L10 1.95112L9.09103 2.83487L5.64284 6.18737L4.35716 2.47737Z" fill=""/>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-7.5">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-lg dark:border-strokedark dark:bg-boxdark"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${action.color} text-white text-xl`}>
                  {action.icon}
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                  {action.title}
                </h4>
                <p className="text-sm text-bodydark2">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-7.5 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Welcome to Nature Harvest Admin Dashboard
          </h3>
          <p className="text-bodydark2">
            Manage your organic juice business efficiently. From product management to customer inquiries, 
            everything you need to run Nature Harvest is right here. Get started by exploring the menu 
            or using the quick actions above.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 