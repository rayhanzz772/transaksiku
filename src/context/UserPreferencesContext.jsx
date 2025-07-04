import React, { createContext, useContext, useState } from 'react';

// 1. Buat Context
const UserPreferencesContext = createContext();

// 2. Provider Component
export const UserPreferencesProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('id');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const updateLanguage = (lang) => setLanguage(lang);
  const updateItemsPerPage = (count) => setItemsPerPage(count);

  return (
    <UserPreferencesContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        language,
        updateLanguage,
        itemsPerPage,
        updateItemsPerPage,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

// 3. Custom Hook (optional, best practice)
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
