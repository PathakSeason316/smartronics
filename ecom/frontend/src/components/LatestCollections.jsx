import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollections() {

    const {products} = useContext(ShopContext);
    const [newestProducts, setNewestProducts] = useState([]);

    useEffect(()=> {
      setNewestProducts(products.slice(0,10));
    },[])

  return (
    <div className='my-10'>
      <div className = 'text-center py-8 text-3x1'>
        <Title heading={'LATEST'} subheading={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, atque.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          newestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollections