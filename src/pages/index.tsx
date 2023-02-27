import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, DetailProduct } from "@/components";
import items from "@/data/items.json";

const Index = () => {
  const [basketItems, setBasketItems] = useState([]);
  const currentId = 1;

  const product = items.find((item) => item.id === currentId);

  const deleteItemFromBasket = (id: number) => {
    const filteredBasket = basketItems.filter((basketItem) => {
      return basketItem.id !== id;
    });
    setBasketItems(filteredBasket);
  };

  const addItemToBasket = (product: object, amount: number) => {
    if (amount === 0) return;

    const isTargetExistInBasketItems = basketItems.filter((basketItem) => {
      return basketItem.id === currentId;
    });

    if (isTargetExistInBasketItems.length !== 0) {
      const filteredBasket = basketItems.filter((basketItem) => {
        return basketItem.id !== product.id;
      });
      const newItem = basketItems.find((basketItems) => {
        return basketItems.id === product.id;
      });
      if (newItem !== undefined) {
        newItem.amount = newItem.amount += amount;
      }
      setBasketItems([...filteredBasket, newItem]);
      return;
    }

    setBasketItems([...basketItems, { ...product, amount }]);
  };

  useEffect(() => {
    console.log(basketItems);
  });

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
