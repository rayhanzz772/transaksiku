// components/atoms/ProfileAtoms.jsx
import React from 'react';

export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-400 dark:text-gray-300">
    {children}
  </label>
);

export const InputField = ({ id, type = 'text', value, onChange, isDarkMode }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
  />
);

export const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`${className} px-5 py-2 rounded-md shadow-md transition duration-200`}
  >
    {children}
  </button>
);

export const ToggleSwitch = ({ id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center cursor-pointer">
    <div className="relative">
      <input type="checkbox" id={id} className="sr-only" checked={checked} onChange={onChange} />
      <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
      <div
        className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ease-in-out"
        style={{ transform: checked ? 'translateX(100%)' : 'translateX(0)' }}
      ></div>
    </div>
  </label>
);