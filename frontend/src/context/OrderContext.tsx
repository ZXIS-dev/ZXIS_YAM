// src/context/OrderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";

type Order = {
  orderId: string;
  items: any[];
  totalPrice: number;
  paymentMethod: string;
  createdAt: Date;
  status?: "cooking" | "completed";
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    const newOrder: Order = { ...order, status: "cooking" };
    setOrders((prev) => [newOrder, ...prev]);

    // 5초 후 자동으로 "조리완료"로 변경 (테스트용)
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === newOrder.orderId ? { ...o, status: "completed" } : o
        )
      );
      Alert.alert("알림", `주문번호 ${newOrder.orderId}번 조리 완료되었습니다!`);
    }, 8000); // 5초 후 조리 완료 (실제는 15분 등으로 조정)
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
