import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg'>
        {/* hero left */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#333]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='text-medium text-sm md:text-base'>Our Best Sellers</p>
                </div>
                <h1 className='prata-regular text-3xl md:text-5xl font-semibold my-4'>Latest Arrival</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>

        {/* hero right */}
        {/* <div className='w-full sm:w-1/2 flex items-center justify-center bg-gray-100 py-10 sm:py-0'>
            <img src='https://via.placeholder.com/400' alt='Hero Image' className='w-full h-auto object-cover' />
        </div> */}
        <img src={assets.hero_img} alt='hero' className='w-full sm:w-1/2' />
    </div>
  )
}

export default Hero