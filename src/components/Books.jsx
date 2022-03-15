import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookCard from "./BookCard";

function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS());

  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto px-8">
        <h3 className="font-bold text-sm border-b border-gray-200 pb-3">All Books</h3>
        <div className="flex flex-wrap -mx-3 mt-3 mb-10">
          {loading && <p>Loading...</p>}
          {error && <p>{error.toString()}</p>}
          {data?.books?.map((item) => (
            <div className="w-full px-3 py-3 mb-5 sm:w-1/2 lg:w-1/3" key={item?.id}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Books;
