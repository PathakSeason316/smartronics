import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
//   console.log(id);
  return (
    
    <div className="rounded-xl shadow hover:shadow-md transition p-4 bg-white">
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        
        <div className='overflow-hidden'>
          <img
            className='hover:scale-110 transition ease-in-out'
            src={image?.[0] || '/placeholder.png'}
            alt={name}
          />
        </div>
        <p className='pt-4 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
