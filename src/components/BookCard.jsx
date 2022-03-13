import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/general';

import Like from '../assets/svgs/like.svg';
import Purchase from '../assets/svgs/purchase.svg';
import Cart from '../assets/svgs/cart.svg';
import StarRatings from './StarRatings';
import { addToCart } from '../utils/cartOps';

function BookCard({ data }) {
  return (
    <div className="w-full h-full flex relative bg-white hover:shadow-product">
      <Link to={`/book/${data?.id}`}>
        <div className="relative w-28 h-full">
          <img src={data?.image_url} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
      </Link>
      <div className="px-3 py-2">
        <h3 className="font-bold text-sm mb-1">{data?.title}</h3>

        <div className="mb-3">
          <p className="">
            {data?.authors?.map(({ name }) => name).join(', ')}
            &nbsp;-&nbsp;
            {new Date(data?.published_at).getFullYear()}
          </p>
          <p className="">
            {data?.genres?.map(({ name }) => name).join(', ')}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-3 mr-2 pt-1.5">
            <center className="">
              <img src={Purchase} alt="" width="16" />
              {data?.number_of_purchases}
            </center>
            <center className="">
              <img src={Like} alt="" width="16" />
              {data?.likes}
            </center>
          </div>
          <div className="pl-2 border-l">
            <p className="">
              Rating:&nbsp;
              {data?.rating}
            </p>
            <StarRatings rating={data?.rating} />
          </div>
        </div>
        <p className="mb-2">
          {formatCurrency(data?.price, data?.currency)}
          <span className={`ml-5 ${data?.newCount ? 'text-green-400' : 'text-red-400'}`}>
            {data?.newCount ? `${data?.newCount} Copies Available` : 'Out of stock'}
          </span>
        </p>
        {data?.newCount > 0 && (
          <button
            onClick={() => addToCart(data)}
            className="flex items-center font-semibold"
            type="button"
          >
            <img src={Cart} className="mr-3" alt="" width="15" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default BookCard;
