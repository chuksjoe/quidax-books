import Search from '../assets/svgs/search.svg';

function SearchInput({ className }) {
  return (
    <div className={`${className}`}>
      <div className="w-full relative">
        <input className="w-full outline-none border py-1.5 pl-2 pr-10 border-gray-200" />
        <div className="absolute top-0 right-0 bg-gray-100 h-full py-3 px-3 border border-gray-200">
          <img src={Search} alt="Search" width="16" height="" />
        </div>
      </div>
    </div>
  )
}

export default SearchInput;
