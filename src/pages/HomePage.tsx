import React, { useState, useMemo } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
    const { state } = useProductContext();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return state.products.filter((product) => {
            const matchName = product.ten.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = selectedCategory ? product.danhMuc === selectedCategory : true;
            const matchMinPrice = minPrice ? product.gia >= minPrice : true;
            const matchMaxPrice = maxPrice ? product.gia <= maxPrice : true;
            return matchName && matchCategory && matchMinPrice && matchMaxPrice;
        });
    }, [state.products, searchTerm, selectedCategory, minPrice, maxPrice]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách sản phẩm</h1>
            <button
                onClick={() => navigate('/add')}
                style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Thêm sản phẩm mới
            </button>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Filter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />

            <p>Tổng số sản phẩm: {filteredProducts.length}</p>

            <ProductList products={currentProducts} />

            {filteredProducts.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default HomePage;
