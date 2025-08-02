import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandle = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
      <p className='text-2x1 font-medium text-gray-800'>Get 20% off by Subscribing Now </p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia corporis nostrum blanditiis illo atque, quos nisi in perferendis qui impedit.
      </p>
      <form onSubmit={onSubmitHandle} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 p1-3'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required>
        </input>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
