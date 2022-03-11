import Books from "../components/Books";
import FeaturedBooks from "../components/FeaturedBooks";

function Home() {
  return (
    <div className="w-full pt-5">
      <FeaturedBooks />
      <Books />
    </div>
  )
}

export default Home;
