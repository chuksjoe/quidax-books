import Carousel from "./Carousel";

function FeaturedBooks() {
  return (
    <section className="w-full mb-8">
      <div className="max-w-7xl mx-auto px-8 pt-4 pb-2">
        <h3 className="font-bold text-sm border-b border-gray-200 pb-3">Featured Books</h3>
      </div>
      <Carousel />  
    </section>
  )
}

export default FeaturedBooks;
