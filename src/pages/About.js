import React from "react";

const About = () => {
  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 lg:px-20 py-16 text-gray-800">
      {/* Intro Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Gyros Hero</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Bringing authentic Mediterranean flavors to Houston since 2016!
        </p>
      </div>

      {/* About Content */}
      <section className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        {/* Text */}
        <div className="lg:w-1/2 space-y-5">
          <h2 className="text-2xl font-semibold text-[#FAC31B]">Our Story</h2>
          <p>
            Since 2016, Gyros Hero has been serving authentic Mediterranean cuisine in Houston, earning the trust and loyalty of our customers. What began as a small dream has grown into a go-to destination for fresh, flavorful, and halal Mediterranean dishes.
          </p>
          <p>
            Beyond our restaurant, we specialize in catering for events of all sizes, from family gatherings to corporate functions. Our daily lunch pop-ups at corporate offices bring high-quality, delicious meals to professionals across the city.
          </p>
          <p>
            With a commitment to quality, authenticity, and customer satisfaction, Gyros Hero continues to grow while staying true to our roots.
          </p>
          <p>
            Gyros Hero is more than just a restaurant — it’s a family, a tradition, and a promise to always deliver the best Mediterranean flavors with every bite. We look forward to serving you, whether you dine with us, book catering, or enjoy one of our lunch events.
          </p>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src="/images/gh-bg.jpg"
            alt="Gyros Hero Restaurant"
            className="rounded-lg shadow-lg w-full object-cover h-[400px]"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#FAC31B] mb-4">Why Choose Us?</h2>
        <p className="text-gray-700 text-lg">
          We take pride in offering <strong>high-quality halal food</strong>, ensuring every meal is fresh, flavorful, and satisfying.
          From our famous gyros to our house-made sauces, everything is prepared with care and passion.
        </p>
      </section>
    </div>
  );
};

export default About;