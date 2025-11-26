import React from 'react';
import { Product } from '../context/ProductContext';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    if (products.length === 0) {
        return <p>Không tìm thấy sản phẩm nào.</p>;
    }

    return (
        <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
