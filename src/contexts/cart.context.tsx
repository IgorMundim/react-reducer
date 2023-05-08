import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

interface IProps {
  children: React.ReactNode;
}
export enum CartType {
  ADD_ITEM_CART = 'SET_CURRENT_USER',
}

export interface CartContextProps {
  addProductsToCart: (cart: ProductProps) => void;
  clearItemFromCart: (cart: ProductProps) => void;
  removeItemToCart: (cart: ProductProps) => void;
  cartItems: ProductProps[];
  cartCount: number;
  cartTotal: number;
}
export interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartAction {
  type: CartType;
  payload: CartState;
}
interface CartState {
  cartItems: [
    {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      quantity: number;
    }
  ];
  cartCount: number;
  cartTotal: number;
}

const INITIAL_STATE = {
  cartItems: [{}] as [
    {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      quantity: number;
    }
  ],
  cartCount: 0,
  cartTotal: 0,
};
const addCartItems = (cartItems: ProductProps[], productsToAdd: ProductProps) => {
  const existingCartItems = cartItems.find((cartItem: ProductProps) => cartItem.id === productsToAdd.id);
  if (existingCartItems) {
    return cartItems.map((cartItem: ProductProps) =>
      cartItem.id === productsToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...productsToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems: ProductProps[], cartItemToRemove: ProductProps) => {
  return cartItems.filter((cartItem: ProductProps) => cartItem.id !== cartItemToRemove.id);
};

const removeCartItem = (cartItems: ProductProps[], cartItemToRemove: ProductProps) => {
  const existingCartItem: ProductProps | undefined = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem: ProductProps) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

export const CartContext = createContext<CartContextProps | null>(null);

export const cartReducer = (state: CartState, action: CartAction) => {
  const { type, payload } = action;
  switch (type) {
    case CartType.ADD_ITEM_CART:
      return { ...state, ...payload };
    default:
      throw new Error(` Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }: IProps) => {
  const [{ cartItems, cartTotal, cartCount }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  useEffect(() => {
    cartItems.pop();
  }, []);

  const updateCartItemsReducer = (cartItems: ProductProps[]) => {
    const newCartCount = cartItems.reduce((total: number, cartItem: ProductProps) => total + cartItem.quantity, 0);

    const newCartTotal = cartItems.reduce(
      (total: number, cartItem: ProductProps) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch(createAction(CartType.ADD_ITEM_CART, payload));
  };
  const addProductsToCart = (product: ProductProps) => {
    const newCartItem = addCartItems(cartItems as ProductProps[], product);
    updateCartItemsReducer(newCartItem);
  };

  const clearItemFromCart = (cartItemToClear: ProductProps) => {
    const newCartItems = clearCartItem(cartItems as ProductProps[], cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove: ProductProps) => {
    const newCartItems = removeCartItem(cartItems as ProductProps[], cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    addProductsToCart,
    clearItemFromCart,
    removeItemToCart,
    cartItems,
    cartCount,
    cartTotal,
  } as CartContextProps;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
