import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_DEVICE_URL } from '@env';

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
  addToCart: (item: CartItem) => Promise<boolean>; // 항목 추가 함수
  removeFromCart: (id: string, toppings:string[]) => void; // 항목 삭제
  clearCart: () => void; //전체 삭제
  loadCartFromServer: () => void; //서버에서 장바구니 불러오기
};

// Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// 장바구니 상태 제공
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // 상태 초기화

  //서버의 장바구니 불러오기
  const loadCartFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if(!token) {
        throw new Error('토큰 없음');
      }
      const response = await fetch(`${API_DEVICE_URL}/api/cart/getCart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if(!response.ok || !data.success) {
        throw new Error(data.message);
      }
      setCartItems(data.cart);
      console.log('서버의 장바구니 불러오기 성공', data.cart)
    } catch(err) {
      console.log('장바구니 불러오기 에러: ', err);
    }
  }
  // 장바구니에 항목 추가하는 함수
 const addToCart = async (item: CartItem) : Promise<boolean> =>  {

  //서버로 장바구니 항목을 보냄
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('토큰 없음');
    }
    const response = await fetch(`${API_DEVICE_URL}/api/cart/addCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    if(!response.ok || !data.success) {
      throw new Error(data.message);
    }
    
    //---------로컬에 추가----------
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
  return true;
  } catch (err) {
    console.log('장바구니 서버 에러', err);
    return false;
  }
};
// id랑 토핑 조합을 기준으로 삭제함
const removeFromCart = async (id: string, toppings: string[]) => {
    try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('토큰 없음');

    const response = await fetch(`${API_DEVICE_URL}/api/cart/deleteItem/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id, toppings})
      });
    const data = await response.json();
    if(!response.ok || !data.success) {
      throw new Error(data.message)
    }
    //-------로컬 항목 삭제
    const generateKey = (item: CartItem) =>
      `${item.id}-${item.toppings.slice().sort().join(',')}`;
    const targetKey = `${id}-${toppings.slice().sort().join(',')}`;

    setCartItems(prev =>
      prev.filter(item => generateKey(item) !== targetKey)
    );
    } catch(err) {
      console.log('장바구니 에러: ', err);
    }
};
const clearCart = async () => {
    try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('토큰 없음');

    const response = await fetch(`${API_DEVICE_URL}/api/cart/deleteCart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    const data = await response.json();
    if(!response.ok || !data.success) {
      throw new Error(data.message)
    }
    //서버에서 삭제 성공 시에만 로컬에서도 비움
    setCartItems([]);
    } catch(err) {
        console.log('장바구니 서버 에러', err);
    }
}

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loadCartFromServer }}>
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
