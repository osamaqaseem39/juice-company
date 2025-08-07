import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../common/PageMeta';

interface FormLayoutProps {
  title: string;
  description: string;
  backPath: string;
  backText: string;
  children: React.ReactNode;
  error?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  backPath,
  backText,
  children,
  error
}) => {
  return (
    <>
      <PageMeta
        title={title}
        description={description}
      />
      
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {title}
            </h1>
            <Link 
              to={backPath} 
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {backText}
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
}; 