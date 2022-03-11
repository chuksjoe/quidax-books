import SearchInput from './SearchInput';

import Logo from '../assets/images/brand.png';
import Shelve from '../assets/svgs/shelve.svg';
import Cart from '../assets/svgs/cart.svg';

function Header() {
  return (
    <header className="fixed w-full z-20 h-24 bg-white shadow-lg border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-8">
      <div className="w-full flex justify-between items-center py-5">
        <a href="/">
          <img src={Logo} alt="Quidax books logo" width="170" />
        </a>

        <SearchInput className="w-96" />

        <div className="flex items-center space-x-6">
          <div className="p-4 rounded-full bg-gray-100">
            <img src={Shelve} alt="Shelve" width="23" />
          </div>
          <div className="">
            <img src={Cart} alt="Cart" width="25" />
          </div>
        </div>

      </div>
    </div>
  </header>
  )
}

export default Header;
