// ATOMS (UIElements.js)
import React, { useState, useEffect } from 'react';

export const Input = ({ id, value, onChange, placeholder, error }) => (
  <div>
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

export const Button = ({ onClick, children, className = '', type = 'button' }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-5 py-2 rounded-md shadow-md transition duration-200 ${className}`}
  >
    {children}
  </button>
);