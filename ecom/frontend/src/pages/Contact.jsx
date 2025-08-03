import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="pt-10 border-t">

      {/* Page Title */}
      <div className="text-center text-2xl mb-10">
        <Title heading="CONTACT" subheading="US" />
      </div>

      {/* Contact Info Section */}
      <div className="my-10 flex flex-col md:flex-row items-center md:items-start gap-10 px-4 md:px-8 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded shadow-sm"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6 md:w-2/4 text-gray-600">
          <div>
            <p className="font-semibold text-xl text-gray-800 mb-1">Our Store</p>
            <p>2810 King Street, Toronto</p>
          </div>
          <div>
            <p>
              <strong>Tel:</strong> (905) 352-3582<br />
              <strong>Email:</strong> smartronics@gmail.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-800 mb-1">Careers at Smartronics</p>
            <p>Learn more about our teams and job openings.</p>
          </div>

          <button className="border border-black px-8 py-3 text-sm font-medium rounded transition duration-300 hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
