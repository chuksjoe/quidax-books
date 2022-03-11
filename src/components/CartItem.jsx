import { formatCurrency } from "../utils/general";

function CartItem({ data, removeItem, updateCount }) {
  return (
    <div className="w-full flex">
      <div className="relative w-20 h-24">
        <img src={data?.image} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      </div>
      <div className=" w-full flex justify-between pl-4 space-x-3">
        <div className="flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="font-bold text-sm mb-1">{data?.title}</h3>
            <p className="text-xs">
              {data?.authors?.map(({ name }) => name).join(', ')}
            </p>
          </div>

          <button
            onClick={() => removeItem(data?.id)}
            className="flex items-center font-semibold"
            type="button"
          >
            Remove
          </button>
        </div>

        <div className="text-right">
          <p className="text-sm mb-2">
            {formatCurrency(data?.price)}
          </p>
          <ul className="flex items-center">
            <li
              role="presentation"
              onClick={() => updateCount(data?.id, data?.count - 1)}
              className="px-3 py-1 border bg-gray-100 hover:bg-gray-200 cursor-pointer border-r-0">-</li>
            <li className="px-3 py-1 border border-r-0">{data?.count}</li>
            <li
              role="presentation"
              onClick={() => updateCount(data?.id, data?.count + 1)}
              className="px-3 py-1 border bg-gray-100 hover:bg-gray-200 cursor-pointer">+</li>
          </ul>
          <p className="font-bold text-sm mt-4">
            {formatCurrency(data?.price * data?.count)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem;
