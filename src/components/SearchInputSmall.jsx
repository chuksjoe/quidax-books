import { useState } from "react";
import { useReactiveVar } from "@apollo/client";

import { searchTextVar } from "../caches/general";

import Search from '../assets/svgs/search.svg';
import Close from '../assets/svgs/close.svg';
import Arrow from '../assets/svgs/arrow-back.svg';

function SearchInputSmall({ className }) {
  const searchText = useReactiveVar(searchTextVar);
  const [showTextbox, setShowTextbox] = useState(false);

  const handleClose = () => {
    setShowTextbox(false);
    searchTextVar('');
  };

  return (
    <>
      <button
        className={`${className}`}
        onClick={() => setShowTextbox(true)}
      >
        <img src={Search} alt="Search" width="24" />
      </button>

      <div
        className={`search-overlay ${
          showTextbox ? 'show' : ''} fixed z-30 top-0 left-0 w-full h-full ${
          searchText ? '' : 'bg-gray-500'} bg-opacity-50`}
      >
        <div className="w-full flex items-center bg-white px-8 py-5">
          <button
            className={`${className} mr-5`}
            onClick={handleClose}
          >
            <img src={Arrow} alt="Back Arrow" width="24" />
          </button>

          <div className="w-full relative">
            <input
              value={searchText}
              onChange={(e) => searchTextVar(e?.target?.value?.trim())}
              className="w-full outline-none border py-2 pl-4 pr-10 border-gray-200"
            />
            {searchText ? (
              <button
                onClick={() => searchTextVar('')}
                className="absolute top-0 right-0 bg-gray-100 h-full py-2.5 px-3 border border-gray-200"
              >
                <img src={Close} alt="Close" width="16" />
              </button>
            ) : (
              <div
                className="absolute top-0 right-0 bg-gray-100 h-full py-2.5 px-3 border border-gray-200"
              >
                <img src={Search} alt="Search" width="16" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchInputSmall;
