import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, navigate, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
      if(products.length > 0){

        const tempData = [];
        for (const productId in cartItems) {
          for (const size in cartItems[productId]) {
            const qty = cartItems[productId][size];
            if (qty > 0) {
              tempData.push({
                _id: productId,
                size,
                quantity: qty,
              });
            }
          }
        }
      setCartData(tempData);

    }

  }, [cartItems,products]);

  return (
    <section className="border-t pt-14">
      <div className="mb-6">
        <Title heading="YOUR" subheading="CART" />
      </div>

      <div>
        {cartData.length === 0 && (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        )}

        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-cover rounded"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2 text-sm sm:text-base">
                    <p>
                      {currency}{productData.price}
                    </p>
                    <span className="px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                className="border w-full max-w-16 sm:max-w-20 px-2 py-1 text-center"
                min={1}
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    updateQuantity(item._id, item.size, value);
                  }
                }}
              />

              {/* Delete Icon */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer mx-auto"
                src={assets.bin_icon}
                alt="Delete"
                title="Remove from cart"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black hover:bg-gray-800 text-white text-sm my-8 px-8 py-3 rounded transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
