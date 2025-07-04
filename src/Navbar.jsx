import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass =
    'px-4 py-2 rounded hover:bg-grey-400 hover:text-white transition-colors';

  const activeClass =
    'bg-white text-white';

  return (
    <nav className="w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Transaksiku</Link>
        </div>
        <div className="flex space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
