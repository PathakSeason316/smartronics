import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    setNewestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <Title heading="LATEST" subheading="COLLECTION" />
        <p className="w-full sm:w-3/4 md:w-1/2 mx-auto text-sm sm:text-base text-gray-600 mt-2">
          Discover our newest arrivals — crafted with fresh designs, seasonal trends, and essential style.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {newestProducts.length > 0 ? (
          newestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">No latest products available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestCollections;
