import React from 'react';
//import './ProductCard.css';

const ProductCard = ({ productos }) => {

   //productos es un objeto json JESUS JUNTA MERCADOLIBRE Y AMAZON Y CCOLOCA LOS RESULTADOS AQUI

    const ProductCard = ({ /*Colocar el nuevo nombre del arreglo aqui */ }) => {
        if (!productos || productos.length == 0) return <p>No products found</p>;

        return (
            <div className="product-list">
                {productos.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-price">Precio: ${product.price}</p>
                        <a href={product.url} target="_blank" rel="noopener noreferrer" className="buy-link">Comprar</a>
                    </div>
                ))}
            </div>
        );
    };
};
export default ProductCard;
