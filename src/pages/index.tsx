import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, DetailProduct } from "@/components";
import items from "@/data/items.json";

const Index = () => {
  const [basketItems, setBasketItems] = useState<Items[]>([]);
  const currentId = 1;

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

  const product: Product | undefined = items.find((item: Product): boolean => item.id === currentId);

  const deleteItemFromBasket = (id: number) => {
    const filteredBasket: Items[] = basketItems.filter((basketItem: Product): boolean => basketItem.id !== id);
    setBasketItems(filteredBasket);
  };

  const addItemToBasket = (product: Product | Items, amount: number) => {
    if (amount === 0) return;
    const target = basketItems.find((basketItem) => basketItem.id === product.id);

    if (target !== undefined) {
      const filteredBasketItems = basketItems.filter((basketItem) => basketItem.id !== target.id);
      const cloneTarget: Items = target;
      cloneTarget.amount = cloneTarget.amount + amount;
      setBasketItems([...filteredBasketItems, cloneTarget]);
      return;
    }

    setBasketItems((currentState) => [...currentState, { ...product, amount }]);
  };

  return (
    <>
      <Head>
        <title>Sneakers | Fall Limited Edition Sneakers</title>
      </Head>
      <Navbar basketItems={basketItems} deleteItemFromBasket={deleteItemFromBasket} />
      <DetailProduct product={product} addItemToBasket={addItemToBasket} />
    </>
  );
};

export default Index;
