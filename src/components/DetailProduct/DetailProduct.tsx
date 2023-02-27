/* eslint-disable react/no-unescaped-entities */
import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import priceToDollarsFormatter from "@/utils/priceFormatter";
import Lightbox from "../Lightbox/Lightbox";

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
  value?: number;
  amount?: number;
}

interface ProductImages {
  full: string;
  thumbnail: string;
}

const DetailProduct = ({ product, addItemToBasket }: { product: Product; addItemToBasket: Function }) => {
  const [totalItemAmount, setTotalItemAmount] = useState<number>(1);
  const [currentLargeImageIndex, setCurrentLargeImageIndex] = useState<number>(0);
  const [lightbox, setLightbox] = useState<Boolean>(false);

  const {
    id,
    name,
    shopName,
    description,
    isDiscount,
    discountPercentage,
    originalPrice,
    totalPrice,
    images,
  }: Product = product;

  const increaseTotalItemAmount = (): void => {
    setTotalItemAmount(totalItemAmount + 1);
  };

  const decreaseTotalItemAmount = (): void => {
    if (totalItemAmount > 1) setTotalItemAmount(totalItemAmount - 1);
  };

  const decreaseCurrentLargeImageIndex = (event: Event): void => {
    event.stopPropagation();
    if (currentLargeImageIndex === 0) {
      setCurrentLargeImageIndex(images.length - 1);
      return;
    }
    setCurrentLargeImageIndex(currentLargeImageIndex - 1);
  };

  const increaseCurrentLargeImageIndex = (event: Event): void => {
    event.stopPropagation();
    if (currentLargeImageIndex === images.length - 1) {
      setCurrentLargeImageIndex(0);
      return;
    }
    setCurrentLargeImageIndex(currentLargeImageIndex + 1);
  };

  return (
    <main className={styles.detailProduct}>
      {lightbox && <Lightbox images={images} setLightbox={setLightbox} currentIndex={currentLargeImageIndex} />}
      <div className={styles.detailProduct__preview}>
        <div onClick={() => setLightbox(!lightbox)} className={styles.detailProduct__large}>
          <button onClick={() => decreaseCurrentLargeImageIndex} className={styles.detailProduct__previousImage}>
            <Image
              className={styles.detailProduct__previousImageIcon}
              src="/assets/images/icons/icon-previous.svg"
              alt="Previous image"
              width={12}
              height={12}
            />
          </button>
          <Image
            className={styles.detailProduct__largeImage}
            src={images[currentLargeImageIndex].full}
            alt="Product image"
            fill={true}
          />
          <button onClick={() => increaseCurrentLargeImageIndex} className={styles.detailProduct__nextImage}>
            <Image
              className={styles.detailProduct__nextImageIcon}
              src="/assets/images/icons/icon-next.svg"
              alt="Next image"
              width={12}
              height={12}
            />
          </button>
        </div>
        <div className={styles.detailProduct__thumbnails}>
          {images.map((image, index) => (
            <div
              onClick={() => setCurrentLargeImageIndex(index)}
              className={
                index === currentLargeImageIndex
                  ? styles.detailProduct__thumbnail + " " + styles["detailProduct__thumbnail--active"]
                  : styles.detailProduct__thumbnail
              }
              key={`thumbnail-${index}`}
            >
              <Image src={image.thumbnail} alt="Product images" fill={true} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.detailProduct__information}>
        <div className={styles.detailProduct__header}>
          <h2 className={styles.detailProduct__shopName}>SNEAKER COMPANY</h2>
          <h1 className={styles.detailProduct__itemName}>{name}</h1>
        </div>
        <p className={styles.detailProduct__description}>{description}</p>
        <div className={styles.detailProduct__price}>
          <div className={styles.detailProduct__priceLeft}>
            <p className={styles.detailProduct__totalPrice}>
              {totalPrice !== undefined ? priceToDollarsFormatter(totalPrice) : priceToDollarsFormatter(originalPrice)}
            </p>
            {isDiscount && (
              <div className={styles.detailProduct__discount}>
                <p className={styles.detailProduct__discountText}>{discountPercentage}%</p>
              </div>
            )}
          </div>
          <p className={styles.detailProduct__originalPrice}>{priceToDollarsFormatter(originalPrice) || ""}</p>
        </div>
        <div className={styles.detailProduct__action}>
          <div className={styles.detailProduct__count}>
            <button onClick={decreaseTotalItemAmount} className={styles.detailProduct__decrease}>
              <Image src="/assets/images/icons/icon-minus.svg" alt="Decrease item amount" width={12} height={12} />
            </button>
            <p className={styles.detailProduct__totalItem}>{totalItemAmount}</p>
            <button onClick={increaseTotalItemAmount} className={styles.detailProduct__increase}>
              <Image src="/assets/images/icons/icon-plus.svg" alt="Increase item amount" width={12} height={12} />
            </button>
          </div>
          <button
            onClick={() => addItemToBasket(product, totalItemAmount)}
            className={styles.detailProduct__addToCart}
            type="button"
          >
            <Image
              className={styles.detailProduct__addToCartIcon}
              src="/assets/images/icons/icon-cart.svg"
              alt="Cart icon"
              width={18}
              height={18}
              aria-hidden="true"
            />
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default DetailProduct;
