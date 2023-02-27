interface Product {
  id: number;
  name: string;
  shopName: string;
  description: string;
  isDiscount: boolean;
  discountPercentage: number;
  originalPrice: number;
  totalPrice: number;
  images: ProductImages[];
}

interface Items extends Product {
  amount: number;
}

interface ProductImages {
  full: string;
  thumbnail: string;
}

const getTotalBasketItem = (basketItems: Items[]): number => {
  let total: number = 0;

  basketItems.map((basketItem: Items) => {
    total = total + basketItem.amount;
  });

  return total;
};

export default getTotalBasketItem;
