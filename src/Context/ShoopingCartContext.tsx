import React, { useState } from "react";

import { createContext, useContext, ReactNode } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[]
};

const ShoopingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoopingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItem] = useState<CartItem[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItem((cuurItems) => {
      if (cuurItems.find((item) => item.id === id) == null) {
        return [...cuurItems, { id, quantity: 1 }];
      } else {
        return cuurItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItem((cuurItems) => {
      if (cuurItems.find((item) => item.id === id)?.quantity === 1) {
        return cuurItems.filter((item) => item.id !== id);
      } else {
        return cuurItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItem((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoopingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
       cartItems,
       cartQuantity
      }}
    >
      {children}
    </ShoopingCartContext.Provider>
  );
}
