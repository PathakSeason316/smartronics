import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    //get the produts data from global context
    const {products} = useContext(ShopContext);
    console.log(products);
    const [bestSeller, setBestSeller] = useState([]);

    //filter the products array and display the only 5 first bestsellers
    useEffect(() => {
        const bestProduct = products.filter((item) =>(item.bestSeller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title heading={'BEST'} subheading ={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:tesxt-base text-gray-600'>Tried, tested, and loved by thousands — shop our most popular tech picks.</p>
        </div>

        {/* Render the Best Selling products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }
        </div> 

    </div>
  )
}

export default BestSeller;
