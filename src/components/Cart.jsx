import { useReactiveVar } from "@apollo/client";

import { cartItemsVar, showCartVar } from '../caches/general';

import BackBtn from '../assets/svgs/arrow-back.svg';
import CartIcon from '../assets/svgs/cart.svg';
import CartIconWhite from '../assets/svgs/cart-white.svg';
import CartItem from "./CartItem";
import { formatCurrency } from "../utils/general";

function Cart() {
  const cartItems = useReactiveVar(cartItemsVar);
  const showCart = useReactiveVar(showCartVar);

  const removeItem = (id) => {
    let list = cartItemsVar();
    const newList = list?.filter((item) => item?.id !== id);
    cartItemsVar(newList);
  };

  const updateCount = (id, val) => {
    let list = cartItemsVar();
    list = val < 1
      ? list?.filter((item) => item?.id !== id)
      : list?.map((item) => (item?.id === id ? { ...item, count: val } : item))

    cartItemsVar(list);
  };

  const subTotal = () => {
    if (cartItems?.length < 1) return 0;
    return cartItems?.reduce((acc, cur) => acc + (cur?.price * cur?.count), 0);
  };

  return (
    <div
      role="presentation"
      onClick={(e) => (e?.target?.classList?.contains('cart') && showCartVar(false))}
      className={`cart ${showCart ? 'show' : ''} fixed z-40 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50`}
    >
      <div className="bg-white w-full sm:w-cart absolute right-0 top-0 h-full">
        <div className="w-full">
          <div className=" flex justify-between px-10 py-9 border-b border-gray-200">
            <button className="font-bold flex items-center" onClick={() => showCartVar(false)}>
              <img src={BackBtn} alt="Back Button" className="mr-3" width="12" />
              Back
            </button>

            <h3 className="font-bold flex items-center text-base">
              Your Cart
              <img src={CartIcon} alt="Back Button" className="ml-3" width="20" />
            </h3>
          </div>
          <div className="w-full px-10 py-5">
            <div className=" flex flex-wrap justify-between">
              {cartItems?.map((item) => (
                <div className="w-full py-5 border-b border-gray-200" key={item?.id}>
                  <CartItem data={item} key={item?.id} updateCount={updateCount} removeItem={removeItem} />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-between items-center">
              <p className="">Subtotal</p>
              <p className="font-thin text-4xl">{formatCurrency(subTotal())}</p>
            </div>
            <div className="w-full mt-2">
              <button
                className="flex items-center justify-center font-semibold text-lg bg-black text-white w-full py-5 px-2"
                type="button"
              >
                <img src={CartIconWhite} className="mr-5" alt="" width="20" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
