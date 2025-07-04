// === atoms/UIElements.js ===
import React from 'react';

export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">{children}</label>
);

export const Input = ({ id, name, value, onChange, type = "text", placeholder = "", className }) => (
  <input
    type={type}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
  />
);

export const Select = ({ id, name, value, onChange, children, className }) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    className={className}
  >
    {children}
  </select>
);

export const Card = ({ className, children }) => (
  <div className={`p-6 rounded-lg shadow-md ${className}`}>{children}</div>
);

export const Heading = ({ children, className }) => (
  <h2 className={`text-xl font-semibold mb-4 text-center ${className}`}>{children}</h2>
);

export const SummaryCard = ({ title, value, className }) => (
  <div className={`text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center ${className}`}>
    <p className="text-sm font-medium opacity-90">{title}</p>
    <p className="text-3xl font-extrabold mt-2">{value}</p>
  </div>
);
