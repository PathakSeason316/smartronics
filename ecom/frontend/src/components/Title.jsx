import React from 'react'

const Title = ({heading,subheading}) => {
  return (
    <div className='inline-flex gap-2 item-center mb-3'>
      <p className='prata-regular text-2xl md:text-3xl font-semibold'>{heading} {subheading}</p>
      <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
    </div>
  )
}

export default Title

