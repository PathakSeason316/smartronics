import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="pt-8 border-t">

      {/* About Title */}
      <section className="text-2xl text-center">
        <Title heading="ABOUT" subheading="US" />
      </section>

      {/* About Content */}
      <section className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 px-4">
        <img
          className="w-full md:max-w-[450px] rounded shadow-md"
          src={assets.about_img}
          alt="About"
        />
        <article className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Smartronics is your trusted destination for the latest gadgets and electronics. We bring top-quality products at competitive prices, with a focus on reliability, innovation, and customer satisfaction. Whether it's smartphones, smartwatches, or accessories — we’ve got you covered.
          </p>
          <p>
            We’re passionate about making technology accessible to everyone. With a smooth shopping experience, fast delivery, and responsive support, Smartronics makes tech shopping simple and enjoyable.

          </p>
          <h3 className="font-bold text-gray-800 text-lg">Our Mission</h3>
          <p>
            At Smartronics, our mission is to deliver quality gadgets with ease and affordability. We aim to connect people with the technology they need to stay ahead, live smarter, and shop with confidence.
          </p>
        </article>
      </section>

      {/* Why Choose Us */}
      <section className="text-center text-xl py-6">
        <Title heading="WHY" subheading="CHOOSE US" />
      </section>

      <section className="flex flex-col md:flex-row text-sm px-4 mb-20 gap-6">
        {[
          {
            title: 'Quality Assurance:',
            desc: 'At Smartronics, we are committed to delivering only the highest quality gadgets and electronics. Each product goes through a rigorous quality check process to ensure durability, performance, and safety. We partner with trusted brands and manufacturers to bring you reliable tech you can count on, every time.',
          },
          {
            title: 'Convenience:',
            desc: 'Shopping for electronics has never been easier. With Smartronics, you can browse, compare, and purchase your favorite gadgets from the comfort of your home. Our user-friendly interface, flexible payment options, and quick delivery services are designed to make your shopping experience seamless and stress-free.',
          },
          {
            title: 'Exceptional Customer Service',
            desc: 'Our customers are at the heart of everything we do. Whether you need help choosing the right product or require post-purchase support, the Smartronics support team is always here for you. Expect prompt responses, knowledgeable assistance, and a dedication to solving your issues—because your satisfaction is our priority.',
          },
        ].map((item, index) => (
          <article
            key={index}
            className="border px-8 md:px-12 py-8 sm:py-20 flex flex-col gap-5 rounded-md bg-white shadow-sm"
          >
            <h4 className="font-semibold text-base">{item.title}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </article>
        ))}
      </section>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
