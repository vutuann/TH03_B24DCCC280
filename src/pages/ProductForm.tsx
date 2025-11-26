import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext, Product } from '../context/ProductContext';

const ProductForm: React.FC = () => {
    const { state, dispatch } = useProductContext();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        ten: '',
        danhMuc: 'Khác',
        gia: 0,
        soLuong: 0,
        moTa: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isEditMode) {
            const productToEdit = state.products.find((p) => p.id === Number(id));
            if (productToEdit) {
                setFormData({
                    ten: productToEdit.ten,
                    danhMuc: productToEdit.danhMuc,
                    gia: productToEdit.gia,
                    soLuong: productToEdit.soLuong,
                    moTa: productToEdit.moTa,
                });
            }
        }
    }, [isEditMode, id, state.products]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.ten || formData.ten.length < 3) {
            newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
        }
        if (formData.gia <= 0) {
            newErrors.gia = 'Giá phải là số dương';
        }
        if (formData.soLuong <= 0 || !Number.isInteger(formData.soLuong)) {
            newErrors.soLuong = 'Số lượng phải là số nguyên dương';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (isEditMode) {
            dispatch({
                type: 'UPDATE_PRODUCT',
                payload: { ...formData, id: Number(id) } as Product,
            });
        } else {
            const newId = Math.max(...state.products.map((p) => p.id), 0) + 1;
            dispatch({
                type: 'ADD_PRODUCT',
                payload: { ...formData, id: newId } as Product,
            });
        }
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Tên sản phẩm:</label>
                    <input
                        type="text"
                        value={formData.ten}
                        onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.ten && <span style={{ color: 'red' }}>{errors.ten}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Danh mục:</label>
                    <select
                        value={formData.danhMuc}
                        onChange={(e) => setFormData({ ...formData, danhMuc: e.target.value as any })}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="Điện tử">Điện tử</option>
                        <option value="Quần áo">Quần áo</option>
                        <option value="Đồ ăn">Đồ ăn</option>
                        <option value="Sách">Sách</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Giá:</label>
                    <input
                        type="number"
                        value={formData.gia}
                        onChange={(e) => setFormData({ ...formData, gia: Number(e.target.value) })}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.gia && <span style={{ color: 'red' }}>{errors.gia}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Số lượng:</label>
                    <input
                        type="number"
                        value={formData.soLuong}
                        onChange={(e) => setFormData({ ...formData, soLuong: Number(e.target.value) })}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.soLuong && <span style={{ color: 'red' }}>{errors.soLuong}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Mô tả:</label>
                    <textarea
                        value={formData.moTa}
                        onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}
                >
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
