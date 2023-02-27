const getTotalBasketItem = (basketItems): number => {
  let total: number = 0;

  basketItems.map((basketItem: object) => {
    total = total + basketItem.amount;
  });

  return total;
};

export default getTotalBasketItem;
