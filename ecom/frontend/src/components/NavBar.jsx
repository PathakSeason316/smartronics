import React from 'react'

import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    const [visible, setVisible] = React.useState(false);
  return (
    <div className='flex items-center justify-between py-5 font-medium' >
        <Link to='/'><img src={assets.logo} alt='logo' className='w-36' /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col item-center gap-1' >
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collections' className='flex flex-col item-center gap-1' >
                <p>COLLECTIONS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col item-center gap-1' >
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col item-center gap-1' >
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} alt='search' className='w-6 h-6 cursor-pointer' />
            
            <div className='group relative'>
                <img src={assets.profile_icon} alt='profile' className='w-5 cursor-pointer' />
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                       <p className='hover:text-black'>My Profile</p>
                       <p className='hover:text-black'>Orders</p>
                       <p className='hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt='cart' className='w-5 min-w-5 cursor-pointer' />
                    <span className='absolute -bottom-2 -right-2 bg-black text-white text-xs font-semibold px-1 rounded-full'>0</span>
            </Link>
            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt='menu' className='w-6 h-6 cursor-pointer sm:hidden' />
        </div>
        {/* sidebar menu */}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                    <p>Back</p>
                </div>

                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collections'>COLLECTIONS</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

            </div> 
        </div>
    </div>
  
    )
}

export default NavBar