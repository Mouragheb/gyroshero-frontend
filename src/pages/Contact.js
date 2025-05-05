import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://gyroshero-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 lg:px-16 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <img src="/images/gyroshero-logo.png" alt="Gyros Hero Logo" className="mx-auto h-60 mb-6" />
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>

        <div className="text-gray-700 mb-10 space-y-2">
          <p><strong>Address:</strong> 8730 Westheimer Rd, Houston, Texas 77063</p>
          <p><strong>Phone:</strong> <a href="tel:+13465657012" className="text-red-900 hover:underline">(346) 565-7012</a></p>
          <p><strong>Email:</strong> <a href="mailto:gyrosherotx@gmail.com" className="text-red-900 hover:underline">gyrosherotx@gmail.com</a></p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          <a href="https://m.facebook.com/gyrosherotx/" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.webp" alt="Facebook" className="h-8" />
          </a>
          <a href="https://www.instagram.com/gyrosherotx/?hl=en" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram-icon.png" alt="Instagram" className="h-8" />
          </a>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Catering Inquiries</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 text-left max-w-2xl mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FAC31B]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FAC31B]"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FAC31B]"
          />
          <textarea
            name="message"
            placeholder="Your Inquiry"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FAC31B]"
          />
          <button
            type="submit"
            className="bg-[#FAC31B] hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-md transition w-full"
          >
            Send Inquiry
          </button>
        </form>

        {status && (
          <p className="mt-6 text-center font-medium text-[#FAC31B]">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;