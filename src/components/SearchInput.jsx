import { useReactiveVar } from "@apollo/client";

import { searchTextVar } from "../caches/general";

import Search from '../assets/svgs/search.svg';
import Close from '../assets/svgs/close.svg';

function SearchInput({ className }) {
  const searchText = useReactiveVar(searchTextVar);

  return (
    <div className={`${className}`}>
      <div className="w-full relative">
        <input
          value={searchText}
          placeholder="Search books, genres, authors, etc."
          onChange={(e) => searchTextVar(e?.target?.value?.trimStart())}
          className="w-full outline-none border py-2 pl-4 pr-10 border-gray-200"
        />
        {searchText ? (
          <button
            onClick={() => searchTextVar('')}
            className="absolute top-0 right-0 bg-gray-100 h-full py-2.5 px-3 border border-gray-200"
          >
            <img src={Close} alt="Close" width="16" height="" />
          </button>
        ) : (
          <div
            className="absolute top-0 right-0 bg-gray-100 h-full py-2.5 px-3 border border-gray-200"
          >
            <img src={Search} alt="Search" width="16" height="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchInput;
