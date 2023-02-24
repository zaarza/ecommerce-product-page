import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
  const navbarLinksRef = useRef<HTMLUListElement>(null);
  const [navbarLinks, setNavbarLinks] = useState(false);

  const toggleNavbar = () => {
    setNavbarLinks(!navbarLinks);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <hr className={styles.navbar__line} />
        <div className={styles.navbar__left}>
          <button
            onClick={toggleNavbar}
            type="button"
            className={styles.navbar__hamburger}
          >
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
              navbarLinks
                ? styles["navbar__links"] +
                  " " +
                  styles["navbar__links--active"]
                : styles["navbar__links"]
            }
            ref={navbarLinksRef}
          >
            <button
              onClick={toggleNavbar}
              type="button"
              className={styles.navbar__hamburgerClose}
            >
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
                ? styles["navbar__overlay"] +
                  " " +
                  styles["navbar__overlay--active"]
                : styles["navbar__overlay"]
            }
          />
        </div>
        <div className={styles.navbar__right}>
          <button type="button" className={styles.navbar__cart}>
            <Image
              className={styles.navbar__cartIcon}
              src="/assets/images/icons/icon-cart.svg"
              alt="Cart"
              fill={true}
            />
          </button>
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
