import React from 'react';
import './ProductCard.css';

const ProductCard = ({ productos }) => {

        if (!productos || productos.length == 0) return <p>No products found</p>;
        return (
            <div className="product-list">
                {productos.map((product, index) => (
                    <div key={index} className="product-card">
                        <h3 className="product-title">{product.title}</h3>
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div>
                             <p className="product-plat">{product.plataforma}</p>
                        </div>
                        <p className="product-price">Precio: ${product.price}</p>
                        <a href={product.url} target="_blank" rel="noopener noreferrer" className="buy-link">Comprar</a>
                    </div>
                ))}
            </div>
        );
    };
export default ProductCard;
