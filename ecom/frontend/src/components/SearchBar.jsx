import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    //useLocation hook to only allow search bar visibility from collections page
    const location =useLocation();
    //only display the search bar when the showSearch state variable is set to true
    useEffect(()=>{
        if (location.pathname.includes('collections')) {
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location])


    return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-small' type="text" placeholder='Search' />
            <img src={assets.search_icon} alt="" />
        </div>
        {/* <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt="" /> */}
    </div>
  ) : null
}

export default SearchBar
