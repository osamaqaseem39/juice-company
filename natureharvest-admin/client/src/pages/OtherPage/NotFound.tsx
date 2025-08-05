import React from "react";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";

const NotFound: React.FC = () => {
  return (
    <>
      <PageMeta
        title="404 - Page Not Found | Nature Harvest"
        description="The page you are looking for does not exist"
      />
      
      <div className="flex h-screen items-center justify-center bg-white dark:bg-boxdark">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
              Oops! Page not found
            </h2>
            <p className="mb-8 text-bodydark2">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Go to Homepage
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-md border border-stroke bg-white px-6 py-3 text-center font-medium text-black transition-all hover:bg-primary hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-primary lg:px-8 xl:px-10"
            >
              View Blog
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-bodydark2">
              © 2024 Nature Harvest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
