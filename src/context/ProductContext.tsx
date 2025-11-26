import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// 1. Types
export interface Product {
  id: number;
  ten: string;
  danhMuc: 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';
  gia: number;
  soLuong: number;
  moTa: string;
}

interface State {
  products: Product[];
}

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number };

// 2. Initial Data
const initialProducts: Product[] = [
  { id: 1, ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Flagship mới nhất của Apple' },
  { id: 2, ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Thoáng mát, thấm hút mồ hôi' },
  { id: 3, ten: 'MacBook Air M2', danhMuc: 'Điện tử', gia: 28000000, soLuong: 5, moTa: 'Mỏng nhẹ, mạnh mẽ' },
  { id: 4, ten: 'Giày Sneaker', danhMuc: 'Quần áo', gia: 800000, soLuong: 20, moTa: 'Phong cách trẻ trung' },
  { id: 5, ten: 'Cơm Cháy Chà Bông', danhMuc: 'Đồ ăn', gia: 50000, soLuong: 100, moTa: 'Giòn rụm, đậm đà' },
  { id: 6, ten: 'Harry Potter', danhMuc: 'Sách', gia: 200000, soLuong: 15, moTa: 'Trọn bộ 7 tập' },
  { id: 7, ten: 'Tai nghe Sony', danhMuc: 'Điện tử', gia: 3000000, soLuong: 8, moTa: 'Chống ồn chủ động' },
  { id: 8, ten: 'Quần Jean', danhMuc: 'Quần áo', gia: 400000, soLuong: 30, moTa: 'Vải denim cao cấp' },
  { id: 9, ten: 'Bánh Tráng Trộn', danhMuc: 'Đồ ăn', gia: 20000, soLuong: 200, moTa: 'Đặc sản Sài Gòn' },
  { id: 10, ten: 'Đắc Nhân Tâm', danhMuc: 'Sách', gia: 100000, soLuong: 25, moTa: 'Sách kỹ năng sống' },
  { id: 11, ten: 'Chuột Logitech', danhMuc: 'Điện tử', gia: 500000, soLuong: 12, moTa: 'Chuột không dây' },
  { id: 12, ten: 'Váy Hoa', danhMuc: 'Quần áo', gia: 250000, soLuong: 15, moTa: 'Mùa hè rực rỡ' },
];

const initialState: State = {
  products: initialProducts,
};

// 3. Reducer
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

// 4. Context
interface ProductContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
