import { useNavigate } from 'react-router-dom';

import Like from '../assets/svgs/like-white.svg';
import Purchase from '../assets/svgs/purchase-white.svg';
import StarRatings from './StarRatings';

const CarouselSlideItem = ({ books, pos, idx, slideWidth }) => {
  const navigate = useNavigate();
  const data = books?.[idx];

  return (
    <li
      style={{ width: `${slideWidth}px`, transform: `translateX(${pos * slideWidth}px)` }}
      className="inline-block m-0 p-4 absolute h-300 transition-all duration-300"
    >
      <div className="carousel__slide-item-img-link relative group">
        <img src={data?.image_url} alt={data?.title} />

        <div
          onClick={() => navigate(`/book/${data?.id}`)}
          role="presentation"
          className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-black bg-opacity-70"
        >
          <div className="w-full h-full px-4 py-6 text-white text-xs flex flex-col justify-between">
            <span className={`${data?.available_copies ? 'text-green-400' : 'text-red-400'}`}>
              {data?.available_copies ? 'Available' : 'Out of stock'}
            </span>

            <div>
              <h3 className="truncate font-bold text-lg mb-0.5">{data?.title}</h3>
              <p>{data?.authors?.map(({ name }) => name).join(', ')}</p>
              <p>{new Date(data?.published_at).getFullYear()}</p>
            </div>

            <div className="">
              <p className="font-bold">Genre</p>
              <p className="truncate">
                {data?.genres?.map(({ name }) => name).join(', ')}
              </p>
            </div>

            <div>
              <p className="font-bold">Tags</p>
              <p className="truncate">
                {data?.tags?.map(({ name }) => name).join(', ')}
              </p>
            </div>

            <div className="flex items-center">
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
                  <span className="font-bold">Rating:</span>
                  &nbsp;{data?.rating}
                </p>
                <StarRatings rating={data?.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CarouselSlideItem;
