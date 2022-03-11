import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import { GET_BOOK } from "../queries/queries";
import { formatCurrency, formatDate } from "../utils/general";

import BackBtn from '../assets/svgs/arrow-back.svg';
import Cart from '../assets/svgs/cart-white.svg';
import Like from '../assets/svgs/like.svg';
import Purchase from '../assets/svgs/purchase.svg';
import StarRatings from './StarRatings';

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK(id));

  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto px-8">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data?.book && (
          <div className="w-full relative">
            <div className="fixed w-60 h-book">
              <div className="w-full h-full relative pb-20 overflow-y-auto">
                <button className="font-bold flex items-center mb-8" onClick={() => navigate('/')}>
                  <img src={BackBtn} alt="Back Button" className="mr-3" width="12" />
                  Back
                </button>

                <img src={data?.book?.image_url} alt="Back Button" className="w-full h-auto" />

                <p className={`mt-10 text-sm mb-2 ${data?.book?.available_copies ? 'text-green-400' : 'text-red-400'}`}>
                  {data?.book?.available_copies ? `${data?.book?.available_copies} Copies Available` : 'Out of stock'}
                </p>

                <p className="text-4xl font-thin">
                  {formatCurrency(data?.book?.price, data?.book?.currency)}
                </p>
                <button className="fixed bottom-3 flex items-center justify-center font-semibold text-lg bg-black text-white w-60 py-4 px-2" type="button">
                  <img src={Cart} className="mr-5" alt="" width="15" />
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="w-full pl-60 pt-11 pb-20 text-sm">
              <div className="w-full px-12 overflow-auto">
                <h3 className="font-bold text-4xl mb-4">{data?.book?.title}</h3>
                <p className="font-bold">
                  {data?.book?.authors?.map(({ name }) => name).join(', ')}
                </p>
                <p>{new Date(data?.book?.published_at).getFullYear()}</p>

                <div className="mt-4 mb-8 border-t border-b border-gray-200 py-3">
                  <div className="w-full flex flex-wrap items-center justify-spaced">
                    <div className="flex items-center mb-2 mr-8">
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
                    <div className="mb-2 mr-8">
                      <p className="font-bold">Genre</p>
                      <p className="">
                        {data?.book?.genres?.map(({ name }) => name).join(', ')}
                      </p>
                    </div>
                    <div className="mb-2 mr-8">
                      <p className="font-bold">Tags</p>
                      <p className="">
                        {data?.book?.tags?.map(({ name }) => name).join(', ')}
                      </p>
                    </div>
                    <div className="mb-2 mr-8">
                      <p className="font-bold">Publisher</p>
                      <p className="">
                        {data?.book?.publisher}
                      </p>
                    </div>
                    <div className="">
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
            </div>
          </div>
        )}


      </div>
    </section>
  )
}

export default BookDetails;
