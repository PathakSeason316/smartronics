import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandle = (event) => {
    event.preventDefault();
    // Optional: Add toast or feedback logic here
  };

  return (
    <section className="text-center py-16 px-4 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Get 20% Off by Subscribing Now
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-xl mx-auto">
        Stay updated with our latest offers, products, and deals. We promise not to spam you.
      </p>

      <form
        onSubmit={onSubmitHandle}
        className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;
