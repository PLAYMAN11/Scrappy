import React from 'react';
import './ProductCard.css';

const ProductCard = ([] productos) => {
    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3 className="product-title">{title}</h3>
            <p className="product-price">Precio: ${price}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="buy-link">Comprar</a>
        </div>
    );
};

export default ProductCard;
