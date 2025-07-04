import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUserPreferences } from './context/UserPreferencesContext'; // Ganti path sesuai project mu

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useUserPreferences();

const linkClass = isDarkMode
  ? 'px-4 py-2 rounded !text-white hover:bg-gray-700 transition-colors'
  : 'px-4 py-2 rounded text-gray-800 hover:bg-gray-300 transition-colors';
  
const activeClass = isDarkMode
  ? 'bg-gray-900 text-white'
  : 'bg-white text-black';

  return (
    <nav className={`w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'} shadow-md`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Transaksiku</Link>
        </div>
        <div className="flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/manajemenrekening"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Manajemen Rekening
          </NavLink>
          <NavLink
            to="/laporantransaksi"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Laporan Transaksi
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Transfer
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Profil
          </NavLink>

          {/* Toggle Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-3 py-2 text-black"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
