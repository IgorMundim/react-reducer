import './App.css';

import Header from './components/header';
import Products from './components/products';

const App = () => {
  return (
    <div>
      <Header />
      <section>
        <Products />
      </section>
    </div>
  );
};

export default App;
