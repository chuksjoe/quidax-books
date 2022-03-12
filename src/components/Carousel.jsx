import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import "../assets/styles/carousel.scss";

import ArrowPrev from "../assets/svgs/arrow-prev.svg";
import ArrowNext from "../assets/svgs/arrow-next.svg";

import { GET_BOOKS } from "../queries/queries";

import CarouselSlideItem from "./CarouselSlideItem";

const Carousel = () => {
  const slideWidth = 230;
  const { loading, error, data } = useQuery(GET_BOOKS(10));

  const [items, setItems] = useState([]);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [books, setBooks] = useState([]);
  const [length, setLength] = useState(0);
  
  
  useEffect(() => {
    setLength(data?.books?.length);
    data?.books && setBooks([...data?.books, ...data?.books]);
    setItems(Array.from(Array(data?.books?.length * 2 || 0)).map((_, i) => i));
  }, [data]);

  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length);
  }, [items, length]);

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % (length * 2)]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + (length * 2)) % (length * 2)]);
      });
    }
  };

  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  return (
    <div className="w-full">
      <div className="w-full h-80 relative">
        <button
          className="absolute top-0 h-full p-2.5 bg-white bg-opacity-60 border-r border-white z-10 left-0"
          onClick={() => prevClick()}
        >
          <img src={ArrowPrev} alt="" className="" width={8} />
        </button>
        <div className="w-full h-full relative overflow-hidden">
          {loading && <center>Loading...</center>}
          {error && <center>{error}</center>}
          <ul
            style={{ width: `${(length + 0.5) * slideWidth * 2}px` }}
            className="h-full m-0 p-0 left-1/2 absolute -translate-x-1/2"
          >
            {items.map((pos, i) => (
              <CarouselSlideItem books={books} key={i} idx={i} pos={pos} slideWidth={slideWidth} />
            ))}
          </ul>
        </div>
        <button
          className="absolute top-0 h-full p-2.5 bg-white bg-opacity-60 border-l border-white z-10 right-0"
          onClick={() => nextClick()}
        >
          <img src={ArrowNext} alt="" className="" width={8} />
        </button>
        <div className="flex justify-center relative -top-2.5 space-x-2">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={pos}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full ${i === activeIdx ? "bg-green-400" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
