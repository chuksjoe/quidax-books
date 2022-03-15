import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import { GET_BOOK } from "../queries/queries";
import { formatCurrency, formatDate } from "../utils/general";

import BackBtn from '../assets/svgs/arrow-back.svg';
import Cart from '../assets/svgs/cart-white.svg';
import Like from '../assets/svgs/like.svg';
import Purchase from '../assets/svgs/purchase.svg';
import StarRatings from './StarRatings';
import { addToCart } from "../utils/cartOps";
import { searchTextVar } from "../caches/general";

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK(id));

  useEffect(() => {
    searchTextVar('');
  }, [id]);

  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto px-8">
        {loading && <p>Loading...</p>}
        {error && <p>{error.toString()}</p>}
        {data?.book && (
          <div className="w-full relative">
            <div className="fixed hidden md:block w-60 h-book">
              <div className="w-full h-full relative pb-16 overflow-y-auto">
                <button className="font-bold flex items-center mb-8" onClick={() => navigate('/')}>
                  <img src={BackBtn} alt="Back Button" className="mr-3" width="12" />
                  Back
                </button>

                <img src={data?.book?.image_url} alt="Back Button" className="w-full h-auto" />

                <p className={`mt-10 text-sm mb-2 ${data?.book?.newCount ? 'text-green-400' : 'text-red-400'}`}>
                  {data?.book?.newCount ? `${data?.book?.newCount} Copies Available` : 'Out of stock'}
                </p>

                <p className="text-4xl font-thin">
                  {formatCurrency(data?.book?.price, data?.book?.currency)}
                </p>
                {data?.book?.newCount > 0 && (
                  <button
                    onClick={() => addToCart(data?.book)}
                    className="fixed bottom-2 flex items-center justify-center font-semibold text-lg bg-black text-white w-60 py-5 px-2"
                    type="button"
                  >
                    <img src={Cart} className="mr-5" alt="" width="15" />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
            <div className="w-full md:pl-60 pt-11 pb-28 text-sm">
              <div className="w-full md:px-12 overflow-auto">
                <div className="w-full md:hidden">
                  <button className="font-bold flex items-center mb-8" onClick={() => navigate('/')}>
                    <img src={BackBtn} alt="Back Button" className="mr-3" width="12" />
                    Back
                  </button>

                  <img src={data?.book?.image_url} alt="Back Button" className="w-40 h-auto mb-10" />
                </div>

                <h3 className="font-bold text-4xl mb-4">{data?.book?.title}</h3>
                <p className="font-bold">
                  {data?.book?.authors?.map(({ name }) => name).join(', ')}
                </p>
                <p>{new Date(data?.book?.published_at).getFullYear()}</p>

                <div className="mt-4 mb-8 border-t border-b border-gray-200">
                  <div className="w-full flex flex-wrap items-center justify-spaced">
                    <div className="flex items-center py-4 mr-8">
                      <div className="flex items-center space-x-3 mr-2 pt-1.5">
                        <center className="">
                          <img src={Purchase} alt="" width="16" />
                          {data?.book?.number_of_purchases}
                        </center>
                        <center className="">
                          <img src={Like} alt="" width="16" />
                          {data?.book?.likes}
                        </center>
                      </div>
                      <div className="pl-2 border-l">
                        <p className="">
                          Rating:&nbsp;
                          {data?.book?.rating}
                        </p>
                        <StarRatings rating={data?.book?.rating} />
                      </div>
                    </div>
                    <div className="py-4 mr-8">
                      <p className="font-bold">Genre</p>
                      <p className="">
                        {data?.book?.genres?.map(({ name }) => name).join(', ')}
                      </p>
                    </div>
                    <div className="py-4 mr-8">
                      <p className="font-bold">Tags</p>
                      <p className="">
                        {data?.book?.tags?.map(({ name }) => name).join(', ')}
                      </p>
                    </div>
                    <div className="py-4 mr-8">
                      <p className="font-bold">Publisher</p>
                      <p className="">
                        {data?.book?.publisher}
                      </p>
                    </div>
                    <div className="py-4">
                      <p className="font-bold">Released</p>
                      <p className="">
                        {formatDate(data?.book?.release_date)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-bold mb-4">{data?.book?.subtitle}</p>
                <p className="whitespace-pre-line">{data?.book?.full_description}</p>
              </div>

              {data?.book?.newCount > 0 && (
                <div
                  onClick={() => addToCart(data?.book)}
                  style={{ width: 'calc(100% - 4rem)' }}
                  className="fixed md:hidden bottom-4 flex items-center justify-around bg-black text-white py-5 px-5 cursor-pointer"
                  role="presentation"
                >
                  <img src={Cart} className="mr-5" alt="" width="25" />
                  <div className="">
                    <p className="font-semibold">Add to Cart</p>
                    <p className={`text-xs ${data?.book?.newCount ? 'text-green-400' : 'text-red-400'}`}>
                      {data?.book?.newCount ? `${data?.book?.newCount} Copies Available` : 'Out of stock'}
                    </p>
                  </div>
                  <p className="text-4xl font-thin">
                    {formatCurrency(data?.book?.price, data?.book?.currency)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}


      </div>
    </section>
  )
}

export default BookDetails;
