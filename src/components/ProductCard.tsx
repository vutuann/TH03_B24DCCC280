import React from 'react';
import { Product, useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { dispatch } = useProductContext();
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
        }
    };

    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{product.ten}</h3>
            <p><strong>Danh mục:</strong> {product.danhMuc}</p>
            <p><strong>Giá:</strong> {product.gia.toLocaleString()} VND</p>
            <p><strong>Số lượng:</strong> {product.soLuong}</p>
            <p><em>{product.moTa}</em></p>
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => navigate(`/products/${product.id}`)} style={{ marginRight: '5px' }}>Chi tiết</button>
                <button onClick={() => navigate(`/edit/${product.id}`)} style={{ marginRight: '5px' }}>Sửa</button>
                <button onClick={handleDelete} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Xóa</button>
            </div>
        </div>
    );
};

export default ProductCard;
