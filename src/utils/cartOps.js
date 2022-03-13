import { cartItemsVar, showCartVar } from "../caches/general";

export const addToCart = (data) => {
  if (data?.available_copies < 1) return;

  let list = cartItemsVar();
  const exists = list?.filter((item) => item?.id === data?.id);
  const newItem = {
    id: data?.id,
    title: data?.title,
    image: data?.image_url,
    authors: data?.authors,
    price: data?.price,
    available: data?.available_copies,
    count: ((exists?.[0]?.count || 0) + 1)
  };
  if (exists?.[0]) {
    list = list?.map((item) => (item?.id === data?.id ? newItem : item))
  } else {
    list = [newItem, ...list];
  }
  cartItemsVar(list);
  showCartVar(true);
};
