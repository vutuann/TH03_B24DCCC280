import React from 'react';

interface FilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    minPrice: number;
    setMinPrice: (price: number) => void;
    maxPrice: number;
    setMaxPrice: (price: number) => void;
}

const Filter: React.FC<FilterProps> = ({
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}) => {
    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '8px' }}
            >
                <option value="">Tất cả danh mục</option>
                <option value="Điện tử">Điện tử</option>
                <option value="Quần áo">Quần áo</option>
                <option value="Đồ ăn">Đồ ăn</option>
                <option value="Sách">Sách</option>
                <option value="Khác">Khác</option>
            </select>

            <input
                type="number"
                placeholder="Giá thấp nhất"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                style={{ padding: '8px', width: '120px' }}
            />
            <input
                type="number"
                placeholder="Giá cao nhất"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ padding: '8px', width: '120px' }}
            />
        </div>
    );
};

export default Filter;
