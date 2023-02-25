/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Image from "next/image";
import styles from "./DetailProduct.module.scss";

const DetailProduct = () => {
  const images = [
    {
      full: "image-product-1.jpg",
      thumbnail: "image-product-1-thumbnail.jpg",
    },
    {
      full: "image-product-2.jpg",
      thumbnail: "image-product-2-thumbnail.jpg",
    },
    {
      full: "image-product-3.jpg",
      thumbnail: "image-product-3-thumbnail.jpg",
    },
    {
      full: "image-product-4.jpg",
      thumbnail: "image-product-4-thumbnail.jpg",
    },
  ];

  const [currentLargeImageIndex, setCurrentLargeImageIndex] = useState(0);

  const decreaseCurrentLargeImageIndex = () => {
    currentLargeImageIndex > 0 &&
      setCurrentLargeImageIndex(currentLargeImageIndex - 1);
  };

  const increaseCurrentLargeImageIndex = () => {
    if (currentLargeImageIndex < images.length - 1) {
      setCurrentLargeImageIndex(currentLargeImageIndex + 1);
      console.log(currentLargeImageIndex);
    }
  };

  return (
    <main className={styles.detailProduct}>
      <div className={styles.detailProduct__preview}>
        <div className={styles.detailProduct__large}>
          <button
            disabled={currentLargeImageIndex === 0 && true}
            onClick={decreaseCurrentLargeImageIndex}
            className={styles.detailProduct__previousImage}
          >
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
            src={`/assets/images/product/${images[currentLargeImageIndex].full}`}
            alt="Product image"
            fill={true}
          />
          <button
            disabled={currentLargeImageIndex === images.length - 1 && true}
            onClick={increaseCurrentLargeImageIndex}
            className={styles.detailProduct__nextImage}
          >
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
                  ? styles.detailProduct__thumbnail +
                    " " +
                    styles["detailProduct__thumbnail--active"]
                  : styles.detailProduct__thumbnail
              }
              key={`thumbnail-${index}`}
            >
              <Image
                src={`/assets/images/product/${image.thumbnail}`}
                alt="Product images"
                fill={true}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.detailProduct__information}>
        <div className={styles.detailProduct__header}>
          <h2 className={styles.detailProduct__shopName}>SNEAKER COMPANY</h2>
          <h1 className={styles.detailProduct__itemName}>
            Fall Limited Edition Sneakers
          </h1>
        </div>
        <p className={styles.detailProduct__description}>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer
        </p>
        <div className={styles.detailProduct__price}>
          <div className={styles.detailProduct__priceLeft}>
            <p className={styles.detailProduct__totalPrice}>$125.00</p>
            <div className={styles.detailProduct__discount}>
              <p className={styles.detailProduct__discountText}>50%</p>
            </div>
          </div>
          <p className={styles.detailProduct__originalPrice}>$250.00</p>
        </div>
        <div className={styles.detailProduct__action}>
          <div className={styles.detailProduct__count}>
            <button className={styles.detailProduct__decrease}>
              <Image
                src="/assets/images/icons/icon-minus.svg"
                alt="Decrease item amount"
                width={12}
                height={12}
              />
            </button>
            <p className={styles.detailProduct__totalItem}>0</p>
            <button className={styles.detailProduct__increase}>
              <Image
                src="/assets/images/icons/icon-plus.svg"
                alt="Increase item amount"
                width={12}
                height={12}
              />
            </button>
          </div>
          <button className={styles.detailProduct__addToCart} type="button">
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
