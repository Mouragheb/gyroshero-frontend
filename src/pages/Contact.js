import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:mragheb@gyroshero.com?subject=Catering Inquiry&body=
            Name: ${formData.name}%0D%0A
            Email: ${formData.email}%0D%0A
            Phone: ${formData.phone}%0D%0A
            Message: ${formData.message}`;
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
        </div>
    );
};

export default Contact;