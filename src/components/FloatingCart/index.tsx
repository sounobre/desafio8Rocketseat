import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(
    () =>
      formatValue(
        products.reduce(
          (accumulator, product) =>
            accumulator + product.price * product.quantity,
          0,
        ),
      ),
    [products],
  );

  const totalItensInCart = useMemo(
    () =>
      products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0,
      ),
    [products],
  );

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>
          {`${totalItensInCart} ${totalItensInCart === 1 ? 'item' : 'itens'}`}
        </CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
