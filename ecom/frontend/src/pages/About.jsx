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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
            perspiciatis perferendis quis dicta, illo quae rem quisquam id iusto
            eum!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            totam sit dicta similique nisi quidem!
          </p>
          <h3 className="font-bold text-gray-800 text-lg">Our Mission</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus praesentium voluptas odio commodi, accusantium inventore
            molestiae quasi quisquam officia aliquid?
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
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis beatae, aliquam aperiam temporibus praesentium fugit repellendus ut perferendis error iusto quas ducimus veniam quis, mollitia est quo ex quod.',
          },
          {
            title: 'Convenience:',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis beatae, aliquam aperiam temporibus praesentium fugit repellendus ut perferendis error iusto quas ducimus veniam quis, mollitia est quo ex quod.',
          },
          {
            title: 'Exceptional Customer Service',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis beatae, aliquam aperiam temporibus praesentium fugit repellendus ut perferendis error iusto quas ducimus veniam quis, mollitia est quo ex quod.',
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
