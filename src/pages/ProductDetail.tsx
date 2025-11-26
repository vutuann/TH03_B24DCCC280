import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useProductContext();
    const navigate = useNavigate();

    const product = state.products.find((p) => p.id === Number(id));

    if (!product) {
        return <div>Sản phẩm không tồn tại!</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
                &larr; Quay lại
            </button>
            <h1>Chi tiết sản phẩm</h1>
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                <h2>{product.ten}</h2>
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Danh mục:</strong> {product.danhMuc}</p>
                <p><strong>Giá:</strong> {product.gia.toLocaleString()} VND</p>
                <p><strong>Số lượng:</strong> {product.soLuong}</p>
                <p><strong>Mô tả:</strong> {product.moTa}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
