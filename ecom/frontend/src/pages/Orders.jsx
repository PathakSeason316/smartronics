import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
      <div className="mb-10">
        <Title heading="MY" subheading="ORDERS" />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-start gap-4 md:gap-6">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-lg sm:text-xl text-gray-800">
                    {item.name}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
                    <span>
                      <strong className="text-gray-800">{currency}{item.price}</strong>
                    </span>
                    <span>Quantity: 1</span>
                    <span>Size: M</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Date: <span className="text-gray-400">25, Jul, 2025</span>
                  </p>
                </div>
              </div>

              {/* Status + Track */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium text-green-600">Ready to ship</p>
                </div>
                <button className="border px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
