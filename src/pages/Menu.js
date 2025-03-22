import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
    const [categorizedItems, setCategorizedItems] = useState({});

    useEffect(() => {
        fetch("https://gyroshero-backend.onrender.com/api/menu")
            .then((response) => response.json())
            .then((data) => {
                // Categorize items
                const categories = {};
                data.forEach((item) => {
                    if (!categories[item.category]) {
                        categories[item.category] = [];
                    }
                    categories[item.category].push(item);
                });
                setCategorizedItems(categories);
            })
            .catch((error) => console.error("Error fetching menu:", error));
    }, []);

    return (
        <div className="menu-container">
            <h1>Our Menu</h1>
            {Object.keys(categorizedItems).map((category) => (
                <div key={category}>
                    <h2 className="category-title">{category}</h2>
                    <div className="menu-grid">
                        {categorizedItems[category].map((item) => (
                            <div key={item.id} className="menu-item">
                                <img src={`https://gyroshero-backend.onrender.com${item.image_url}`} alt={item.name} className="menu-image" />
                                <h3>{item.name}</h3>
                                <p>${item.price.toFixed(2)}</p>
                                <a href={item.order_link} className="btn" target="_blank" rel="noopener noreferrer">Order Now</a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;