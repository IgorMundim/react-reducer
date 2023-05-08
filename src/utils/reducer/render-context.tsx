import { render, RenderResult } from '@testing-library/react';

import { CartProvider } from '@/contexts/cart.context';
import { UserProvider } from '@/contexts/user.context';

export const renderContext = (children: React.ReactNode): RenderResult => {
  return render(
    <UserProvider>
      <CartProvider> {children} </CartProvider>
    </UserProvider>
  );
};
