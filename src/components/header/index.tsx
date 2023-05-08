import { useContext, useState } from 'react';

import { CartContext, CartContextProps } from '../../contexts/cart.context';
import { UserContext, UserContextProps } from '../../contexts/user.context';
import Cart from '../cart/index';
import * as Styles from './styles';

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextProps;
  const { cartCount } = useContext(CartContext) as CartContextProps;

  const handleCartClick = () => {
    setCartIsVisible(true);
  };
  const handleLogin = () => {
    setCurrentUser({ firstName: 'User', lastName: '' });
  };

  return (
    <Styles.Container>
      <Styles.Logo>Redux Shopping</Styles.Logo>
      <Styles.Buttons>
        {currentUser.firstName ? (
          <div onClick={handleLogin}>Hello {currentUser.firstName}</div>
        ) : (
          <div onClick={handleLogin}>Login</div>
        )}
        {cartCount > 0 ? (
          <div onClick={handleCartClick}>Card ({cartCount})</div>
        ) : (
          <div onClick={handleCartClick}>Card</div>
        )}
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
    </Styles.Container>
  );
}

export default Header;
