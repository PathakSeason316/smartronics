import React from "react";
import { assets } from "../assets/assets";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Replacement Policy",
    description: "We offer hassle-free exchange policy",
  },
  {
    icon: assets.quality_icon,
    title: "10 Days Return Policy",
    description: "We facilitate 10 days free return policy",
  },
  {
    icon: assets.support_img,
    title: "Excellent Customer Service",
    description: "We provide 24/7 Customer Support",
  },
];

const OurPolicy = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {policies.map((policy, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-14 h-14 mb-4"
            />
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {policy.title}
            </h3>
            <p className="text-sm text-gray-500">{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
