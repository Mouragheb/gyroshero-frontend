import React from "react";
import "./About.css"; // Import the About page styles

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        {/* 
        <h1>About Gyros Hero</h1>
        <p>Bringing authentic Mediterranean flavors to Houston!</p>
        */}
      </div>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Since 2016, Gyros Hero has been serving authentic Mediterranean cuisine in Houston, earning the trust and loyalty of our customers. What began as a small dream has grown into a go-to destination for fresh, flavorful, and halal Mediterranean dishes.
          </p>

          <p>
            Beyond our restaurant, we specialize in catering for events of all sizes, from family gatherings to corporate functions. Our daily lunch pop-ups at corporate offices bring high-quality, delicious meals to professionals across the city.
          </p>

          <p>
            With a commitment to quality, authenticity, and customer satisfaction, Gyros Hero continues to grow while staying true to our roots. Whether you dine with us, book catering, or enjoy our pop-ups.
          </p>
          <p>
            As we continue to grow, our dedication to customer satisfaction, authenticity, and community engagement remains at the core of everything we do. Gyros Hero is more than just a restaurant—it’s a family, a tradition, and a promise to always deliver the best Mediterranean flavors with every bite. We look forward to serving you, whether you visit our restaurant, book us for catering, or enjoy one of our corporate lunch events. Thank you for being a part of our journey, we’re honored to serve you!!
          </p>
        </div>

        <div className="about-image">
          <img src="/images/gh-bg.jpg" alt="Gyros Hero Restaurant" />
        </div>
      </section>

      <section className="about-mission">
        <h2>Why Choose Us?</h2>
        <p>
          We take pride in offering **high-quality halal food**, ensuring every meal is fresh, flavorful, and satisfying. 
          From our famous gyros to our house-made sauces, everything is prepared with care.
        </p>
      </section>
    </div>
  );
};

export default About;