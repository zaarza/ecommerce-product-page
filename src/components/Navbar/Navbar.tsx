import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import priceToDollarsFormatter from "@/utils/priceFormatter";
import multiplyPriceByItemAmount from "@/utils/multiplyPriceByItemAmount";
import getTotalBasketItem from "@/utils/getTotalBasketItem";

type Product = {
  id: number;
  name: string;
  shopName: string;
  description: string;
  isDiscount: boolean;
  discountPercentage: number;
  originalPrice: number;
  totalPrice: number;
  images: ProductImages[];
  amount: number;
};

type ProductImages = {
  full: string;
  thumbnail: string;
};

const Navbar = ({ basketItems, deleteItemFromBasket }: { basketItems: Product[]; deleteItemFromBasket: Function }) => {
  const [navbarLinks, setNavbarLinks] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);

  const toggleNavbar = () => {
    setNavbarLinks(!navbarLinks);
  };

  const toggleCart = () => {
    setCart(!cart);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <hr className={styles.navbar__line} />
        <div className={styles.navbar__left}>
          <button onClick={toggleNavbar} type="button" className={styles.navbar__hamburger}>
            <Image
              className={styles.navbar__hamburgerIcon}
              src="/assets/images/icons/icon-menu.svg"
              alt="Show menu"
              fill={true}
              aria-hidden="true"
            />
          </button>
          <Link href="/" className={styles.navbar__logo}>
            <Image
              className={styles.navbar__logoIcon}
              src="/assets/images/logo.svg"
              alt="Sneakers logo"
              width="128"
              height="0"
            />
          </Link>
          <ul
            className={
              navbarLinks ? styles["navbar__links"] + " " + styles["navbar__links--active"] : styles["navbar__links"]
            }
          >
            <button onClick={toggleNavbar} type="button" className={styles.navbar__hamburgerClose}>
              <Image
                className={styles.navbar__hamburgerCloseIcon}
                src="/assets/images/icons/icon-close.svg"
                alt="Close menu"
                width="16"
                height="16"
                aria-hidden="true"
              />
            </button>
            <div className={styles.navbar__linksInner}>
              <Link href="/" className={styles.navbar__link}>
                Collections
              </Link>
              <Link href="/" className={styles.navbar__link}>
                Men
              </Link>
              <Link href="/" className={styles.navbar__link}>
                Women
              </Link>
              <Link href="/" className={styles.navbar__link}>
                About
              </Link>
              <Link href="/" className={styles.navbar__link}>
                Contact
              </Link>
            </div>
          </ul>
          <div
            onClick={toggleNavbar}
            className={
              navbarLinks
                ? styles["navbar__overlay"] + " " + styles["navbar__overlay--active"]
                : styles["navbar__overlay"]
            }
          />
        </div>
        <div className={styles.navbar__right}>
          <button onClick={toggleCart} type="button" className={styles.navbar__cart}>
            <Image
              className={styles.navbar__cartIcon}
              src="/assets/images/icons/icon-cart.svg"
              alt="Cart"
              fill={true}
            />
            {basketItems.length !== 0 && (
              <div className={styles.navbar__cartNumber}>{getTotalBasketItem(basketItems)}</div>
            )}
          </button>
          <div
            className={
              cart
                ? styles.navbar__cartContainer + " " + styles["navbar__cartContainer--active"]
                : styles.navbar__cartContainer
            }
          >
            <div className={styles.navbar__cartInner}>
              <div className={styles.navbar__header}>
                <h1 className={styles.navbar__title}>Cart</h1>
                <hr className={styles.navbar__titleLine} />
              </div>
              <div className={styles.navbar__items}>
                {basketItems.length !== 0 &&
                  basketItems.map((basketItem: Product, index: number) => {
                    return (
                      <div className={styles.navbar__item} key={`basketItem-${index}`}>
                        <div className={styles.navbar__imageContainer}>
                          <Image
                            className={styles.navbar__image}
                            src={basketItem.images[0].thumbnail}
                            alt="Cart item image"
                            fill={true}
                          />
                        </div>
                        <div className={styles.navbar__cartItemInformation}>
                          <h1 className={styles.navbar__name}>{basketItem.name}</h1>
                          <div className={styles.navbar__price}>
                            <p className={styles.navbar__originalPrice}>
                              {priceToDollarsFormatter(basketItem.totalPrice)}
                            </p>
                            <p className={styles.navbar__multiplication}>x</p>
                            <p className={styles.navbar__multiplicationTotal}>{basketItem.amount}</p>
                            <p className={styles.navbar__total}>
                              {priceToDollarsFormatter(
                                multiplyPriceByItemAmount(basketItem.totalPrice, basketItem.amount)
                              )}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => deleteItemFromBasket(basketItem.id)} className={styles.navbar__remove}>
                          <Image
                            className={styles.navbar__removeIcon}
                            src="/assets/images/icons/icon-delete.svg"
                            alt="Remove item"
                            fill={true}
                          />
                        </button>
                      </div>
                    );
                  })}
                {basketItems.length === 0 && (
                  <div className={styles.navbar__empty}>
                    <p className={styles.navbar__emptyText}>Your cart is empty</p>
                  </div>
                )}
              </div>
              {basketItems.length !== 0 && <button className={styles.navbar__checkout}>Checkout</button>}
            </div>
          </div>
          <button className={styles.navbar__profile}>
            <Image
              className={styles.navbar__profileIcon}
              src="/assets/images/image-avatar.png"
              alt="Cart"
              fill={true}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
