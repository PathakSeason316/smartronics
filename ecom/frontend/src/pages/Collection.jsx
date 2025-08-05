import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sorted = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sorted);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-4 md:px-10 max-w-7xl mx-auto">
      {/* Filter Section */}
      <div className="sm:w-64">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between text-xl font-semibold cursor-pointer mb-4"
        >
          <span>FILTERS</span>
          <img
            className={`w-4 sm:hidden transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle"
          />
        </div>

        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Category Filter */}
          <div className="border border-gray-300 rounded-md p-4 mb-6 bg-white shadow-sm">
            <p className="mb-3 text-sm font-semibold">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {['Men', 'Women', 'Kids'].map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <input
                    className="accent-black"
                    type="checkbox"
                    value={label}
                    onChange={toggleCategory}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
            <p className="mb-3 text-sm font-semibold">TYPE</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <input
                    className="accent-black"
                    type="checkbox"
                    value={label}
                    onChange={toggleSubCategory}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Title heading="ALL" subheading="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm shadow-sm"
          >
            <option value="relevant">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
