import SearchInput from './SearchInput';

import Logo from '../assets/images/brand.png';
import Shelve from '../assets/svgs/shelve.svg';
import Cart from '../assets/svgs/cart.svg';
import { cartItemsVar, showCartVar } from '../caches/general';
import { useNavigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import SearchInputSmall from './SearchInputSmall';

function Header() {
  const navigate = useNavigate();
  const cartItems = useReactiveVar(cartItemsVar);

  const totalCount = () => {
    if (cartItems?.length < 1) return 0;
    return cartItems?.reduce((acc, cur) => acc + cur?.count, 0);
  };

  return (
    <header className="fixed w-full z-30 h-24 bg-white shadow-lg border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-8">
      <div className="w-full flex justify-between items-center py-5">
        <a href="/">
          <img src={Logo} alt="Quidax books logo" width="170" />
        </a>

        <SearchInput className="hidden md:block w-72 lg:w-96" />

        <div className="flex items-center space-x-4 sm:space-x-7">
          <SearchInputSmall className="md:hidden" />
          <div className="p-4 rounded-full hover:bg-gray-100">
            <img src={Shelve} alt="Shelve" className="cursor-pointer" width="23" onClick={() => navigate('/')} />
          </div>
          <div className="relative cursor-pointer" role="presentation" onClick={() => showCartVar(true)}>
            <img src={Cart} alt="Cart" width="25" />
            {totalCount() > 0 && (
              <span className="w-5 h-5 absolute -top-2 -right-2 flex justify-center items-center rounded-full bg-green-500 text-white">
                {totalCount()}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  </header>
  )
}

export default Header;
