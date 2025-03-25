import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
            } else {
                setStatus(result.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="contact-container">
            <img src="/images/gyroshero-logo.png" alt="Gyros Hero Logo" className="hero-logo" />
            <h1>Contact Us</h1>

            <div className="contact-info">
                <p><strong>Address:</strong> 8730 Westheimer Rd, Houston, Texas 77063</p>
                <p><strong>Phone:</strong> <a href="tel:+13465657012">(346) 565-7012</a></p>
                <p><strong>Email:</strong> <a href="mailto:gyrosherotx@gmail.com">gyrosherotx@gmail.com</a></p>
            </div>

            <div className="social-icons">
                <a href="https://m.facebook.com/gyrosherotx/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/facebook-icon.webp" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/gyrosherotx/?hl=en" target="_blank" rel="noopener noreferrer">
                    <img src="/images/instagram-icon.png" alt="Instagram" />
                </a>
            </div>

            <h2>Catering Inquiries</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
                <textarea name="message" placeholder="Your Inquiry" value={formData.message} onChange={handleChange} required />
                <button type="submit">Send Inquiry</button>
            </form>

            {status && <p className="form-status">{status}</p>}
        </div>
    );
};

export default Contact;