import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_BOOKS } from "../queries/queries";
import { toggleScroll } from "../utils/general";
import BookCard from "./BookCard";
import { searchTextVar } from "../caches/general";

function SearchResult() {
  const searchText = useReactiveVar(searchTextVar);
  const { loading, error, data } = useQuery(GET_BOOKS({ searchText }));

  useEffect(() => {
    toggleScroll();

    return () => setTimeout(() => {
      toggleScroll();
    }, 0);
  }, [searchText]);

  return (
    <div className={`z-20 ${searchText ? 'overlay' : 'hidden'} pt-32 w-full h-full bg-white fixed top-0 left-0 overflow-auto`}>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto px-8">
          <div className="border-b border-gray-200 pb-3 text-sm">
            {searchText ? (
              <p className="">
                <span className="font-bold">{`${data?.books?.length || 0} result(s)`}</span>
                &nbsp;found for&nbsp;
                <span className="font-bold">{`\`${searchText}\``}</span>
              </p>
            ) : (
              <h3 className="font-bold">All Search Result...</h3>
            )}
          </div>
          <div className="flex flex-wrap -mx-3 mt-3">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data?.books?.map((item) => (
              <div className="w-full px-3 py-3 mb-5 sm:w-1/2 lg:w-1/3" key={item?.id}>
                <BookCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult;
