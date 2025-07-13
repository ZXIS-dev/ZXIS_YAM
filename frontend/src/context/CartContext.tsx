import React, { createContext, useContext, useState, ReactNode } from 'react';

// 장바구니 항목 타입 정의
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  toppings: string[];
};

// Context 내부 타입 정의
type CartContextType = {
  cartItems: CartItem[]; // 장바구니 항목
  addToCart: (item: CartItem) => void; // 항목 추가 함수
  removeFromCart: (id: string, toppings:string[]) => void; // 항목 삭제
  clearCart: () => void; //전체 삭제
};

// Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// 장바구니 상태 제공
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // 상태 초기화

  // 장바구니에 항목 추가하는 함수
 const addToCart = (item: CartItem) => {
  setCartItems(prev => {
    //토핑 조합이 다르면 다른 항목이기 때문에 고유 키를 생성해 구분
    const generateKey = (item: CartItem) =>
      `${item.id}-${item.toppings.slice().sort().join(',')}`;

    const newItemKey = generateKey(item);

    const exists = prev.find(cart => generateKey(cart) === newItemKey);

    if (exists) {
      // 음식과 토핑이 같으면 수량만 증가
      return prev.map(cart =>
        generateKey(cart) === newItemKey
          ? { ...cart, quantity: cart.quantity + item.quantity }
          : cart
      );
    } else {
      // 새로운 조합이면 배열에 추가
      return [...prev, item];
    }
  });
};
// id랑 토핑 조합을 기준으로 삭제함
const removeFromCart = (id: string, toppings: string[]) => {
  const generateKey = (item: CartItem) =>
    `${item.id}-${item.toppings.slice().sort().join(',')}`;
  const targetKey = `${id}-${toppings.slice().sort().join(',')}`;

  setCartItems(prev =>
    prev.filter(item => generateKey(item) !== targetKey)
  );
};
const clearCart = () => {
    setCartItems([]);
}

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 커스텀 훅으로 다른 컴포넌트에서 사용 가능
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
