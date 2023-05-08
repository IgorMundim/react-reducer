import { screen } from '@testing-library/react';

import CartItem from '@/components/cart-item';
import { renderContext } from '@/utils/reducer/render-context';

import data from './mock';
describe('<CartItem />', () => {
  it('should render component', () => {
    renderContext(<CartItem product={data} />);
    expect(screen.getByText(/Sueter Branco/i)).toBeInTheDocument();
    expect(screen.getByText(/1500/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
