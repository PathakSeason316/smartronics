import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <header className="flex items-center justify-between py-5 px-4 font-medium relative z-50">
      {/* Logo */}
      <Link to="/">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.logo}
          alt="logo"
          className="w-36 cursor-pointer"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
        {['/', '/collections', '/about', '/contact'].map((path, i) => {
          const label = ['HOME', 'COLLECTIONS', 'ABOUT', 'CONTACT'][i];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : ''}`
              }
            >
              <p>{label}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" style={{ visibility: 'hidden' }} />
            </NavLink>
          );
        })}
      </nav>

      {/* Right-side icons */}
      <div className="flex items-center gap-6">
        {/* Profile Dropdown */}
        <div className="group relative">
          <Link className='w-5 cursor-pointer' to='/login'><img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          /></Link>
          <div className="hidden group-hover:block absolute right-0 pt-4 z-10">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
              <p className="hover:text-black cursor-pointer">My Profile</p>
              <p className="hover:text-black cursor-pointer">Orders</p>
              <p className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="cart"
            className="w-5 min-w-5 cursor-pointer"
          />
          <span className="absolute -bottom-2 -right-2 bg-black text-white text-xs font-semibold px-1 rounded-full">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-6 h-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out shadow-lg z-40 ${
          visible ? 'w-full sm:w-[250px]' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>

          {['/', '/collections', '/about', '/contact'].map((path, i) => {
            const label = ['HOME', 'COLLECTIONS', 'ABOUT', 'CONTACT'][i];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="py-3 pl-6 border-t hover:bg-gray-100"
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
