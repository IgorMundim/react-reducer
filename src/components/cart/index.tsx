import { useContext } from 'react';

import { CartContext, CartContextProps } from '../../contexts/cart.context';
import CartItem from '../cart-item';
import * as Styles from './styles';
interface CartProps {
  isVisible: boolean;
  setIsVisible?: any;
}

const Cart = ({ isVisible, setIsVisible }: CartProps) => {
  const handleEscapeAreaClick = () => setIsVisible(false);
  const { cartItems, cartTotal } = useContext(CartContext) as CartContextProps;
  return (
    <Styles.CartContainer isVisible={isVisible}>
      <Styles.CartEscapeArea onClick={handleEscapeAreaClick} />
      <Styles.CartContent>
        <Styles.CartTitle>Seu Carrinho</Styles.CartTitle>
        {cartItems.map((item) => item.id && <CartItem key={item.id} product={item} />)}
        <Styles.CartTotal>Total: ${cartTotal}</Styles.CartTotal>
      </Styles.CartContent>
    </Styles.CartContainer>
  );
};

export default Cart;
