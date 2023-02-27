import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, DetailProduct } from "@/components";
import items from "@/data/items.json";

const Index = () => {
  const [basketItems, setBasketItems] = useState<Product[]>([]);
  const currentId = 1;

  type Product = {
    id?: number;
    name?: string;
    shopName?: string;
    description?: string;
    isDiscount?: boolean;
    discountPercentage?: number;
    originalPrice?: number;
    totalPrice?: number;
    images?: ProductImages[];
    value?: number;
    amount?: number;
  };

  type ProductImages = {
    full: string;
    thumbnail: string;
  };

  const product: Product | undefined = items.find((item: Product): boolean => item.id === currentId);

  const deleteItemFromBasket = (id: number) => {
    const filteredBasket: Product[] = basketItems.filter((basketItem: Product): boolean => basketItem.id !== id);
    setBasketItems(filteredBasket);
  };

  const addItemToBasket = (product: Product, amount: number) => {
    if (amount === 0) return;

    const isTargetExistInBasketItems: Product[] = basketItems.filter((basketItem: Product): boolean => {
      return basketItem.id === currentId;
    });

    if (isTargetExistInBasketItems.length !== 0) {
      const filteredBasket: Product[] = basketItems.filter(
        (basketItem: Product): boolean => basketItem.id !== product.id
      );

      const newItem: Product | undefined = basketItems.find(
        (basketItems: Product): boolean => basketItems.id === product.id
      );

      if (newItem !== undefined && newItem.amount !== undefined) {
        newItem.amount = newItem.amount += amount;
      }

      setBasketItems([...filteredBasket, newItem]);
      return;
    }

    setBasketItems([...basketItems, { ...product, amount }]);
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
