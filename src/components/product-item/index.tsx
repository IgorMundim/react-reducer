import { useContext } from 'react';
import { BsCartPlus } from 'react-icons/bs';

import { CartContext, CartContextProps, ProductProps } from '../../contexts/cart.context';
import CustomButton from '../custom-button/index';
import * as Styles from './styles';

interface ProductItemProps {
  product: {
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
  };
}
const ProductItem = ({ product }: ProductItemProps) => {
  const { addProductsToCart } = useContext(CartContext) as CartContextProps;
  const handleProductClick = () => {
    addProductsToCart(product as ProductProps);
  };
  return (
    <Styles.ProductContainer>
      <Styles.ProductImage imageUrl={product.imageUrl}>
        <CustomButton onClick={handleProductClick} startIcon={<BsCartPlus />}>
          Adicionar ao carrinho
        </CustomButton>
      </Styles.ProductImage>

      <Styles.ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </Styles.ProductInfo>
    </Styles.ProductContainer>
  );
};

export default ProductItem;
