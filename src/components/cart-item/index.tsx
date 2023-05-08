import { useContext } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { CartContext, CartContextProps } from '../../contexts/cart.context';
// Styles
import * as Styles from './styles';
interface CartItemProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
  };
}
const CartItem = ({ product }: CartItemProps) => {
  const { addProductsToCart, clearItemFromCart, removeItemToCart } = useContext(CartContext) as CartContextProps;
  const handleRemoveClick = () => {
    clearItemFromCart(product);
  };

  const handleIncreaseClick = () => {
    addProductsToCart(product);
  };

  const handleDecreaseClick = () => {
    removeItemToCart(product);
  };

  return (
    <Styles.CartItemContainer>
      <Styles.CartItemImage imageUrl={product.imageUrl} />

      <Styles.CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price * product.quantity}</p>

        <Styles.CartItemQuantity>
          <AiOutlineMinus
            size={20}
            id="1"
            onClick={handleDecreaseClick}
            aria-label={`Decrease quantity of ${product.name}`}
          />
          <p>{product.quantity}</p>
          <AiOutlinePlus
            size={20}
            id="2"
            onClick={handleIncreaseClick}
            aria-label={`Increase quantity of ${product.name}`}
          />
        </Styles.CartItemQuantity>
      </Styles.CartItemInfo>

      <Styles.RemoveButton onClick={handleRemoveClick} aria-label={`Remove ${product.name}`}>
        <AiOutlineClose size={25} />
      </Styles.RemoveButton>
    </Styles.CartItemContainer>
  );
};

export default CartItem;
