import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="bg-white pt-6 px-4 sm:px-8 md:px-14 xl:px-20 text-gray-900">
      {/* ----------- Product Section ----------- */}
      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        {/* Left - Images */}
        <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[450px]">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border cursor-pointer hover:scale-105 transition-transform ${
                  image === img ? 'ring-2 ring-orange-500' : ''
                }`}
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow bg-gray-50 rounded-lg flex justify-center items-center p-3 shadow-inner">
            <img
              src={image}
              alt="Product"
              className="object-contain max-h-[420px] rounded"
            />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold leading-tight">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" />
            <span className="ml-2">(122 reviews)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-green-700 mt-1">
            {currency}
            {productData.price}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mt-2">
            {productData.description || 'This is a high-quality product designed for performance and comfort.'}
          </p>

          {/* Size Options */}
          {productData.sizes?.length > 0 && (
            <div className="mt-3">
              <p className="font-medium mb-2">Select Size/Color</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`border px-3 py-1.5 rounded-full text-sm ${
                      s === size
                        ? 'bg-orange-500 text-white border-orange-600'
                        : 'bg-gray-100 hover:bg-orange-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button onClick={()=>addToCart(productData._id,size)} className="mt-4 bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition active:scale-95 w-fit">
            ADD TO CART
          </button>

          {/* Features */}
          <ul className="text-sm text-gray-600 mt-4 space-y-0.5">
            <li>✔️ 100% Original Product</li>
            <li>💵 Cash on Delivery Available</li>
            <li>🔄 10-Day Return Policy</li>
          </ul>

          {/* Description / Reviews */}
          <div className="mt-6">
            <div className="flex border-b">
              <button className="px-5 py-2 border-b-2 border-black text-sm font-semibold">Description</button>
              <button className="px-5 py-2 text-sm text-gray-500">Reviews (122)</button>
            </div>
            <div className="mt-3 px-1 text-sm text-gray-600 space-y-1">
              <p>Product is crafted for durability, usability, and long-lasting performance.</p>
              <p>Ideal for users looking for both design and functionality.</p>
            </div>
          </div>
        </div>
      </div>

     {/* Related Products - seamless continuation */}
<div className="mt-4">
  <RelatedProducts
    category={productData.category}
    subCategory={productData.subCategory}
  />
</div>

    </div>
  );
};

export default Product;
