import Image from "next/image";
import React, { useState } from "react";
import styles from "./Lightbox.module.scss";

const Lightbox = ({ images, setLightbox }) => {
  const [currentLargeImageIndex, setCurrentLargeImageIndex] = useState<Number>(0);

  const decreaseCurrentLargeImageIndex = (): void => {
    if (currentLargeImageIndex === 0) {
      setCurrentLargeImageIndex(images.length - 1);
      return;
    }
    setCurrentLargeImageIndex(currentLargeImageIndex - 1);
  };

  const increaseCurrentLargeImageIndex = (): void => {
    if (currentLargeImageIndex === images.length - 1) {
      setCurrentLargeImageIndex(0);
      return;
    }
    setCurrentLargeImageIndex(currentLargeImageIndex + 1);
  };

  return (
    <div className={styles.lightbox}>
      <div className={styles.lightbox__inner}>
        <div className={styles.lightbox__preview}>
          <button onClick={() => setLightbox(false)} className={styles.lightbox__close} type="button">
            <Image
              className={styles.lightbox__closeIcon}
              src="/assets/images/icons/icon-close.svg"
              alt="Close"
              width={16}
              height={16}
            />
          </button>
          <div className={styles.lightbox__large}>
            <button onClick={decreaseCurrentLargeImageIndex} className={styles.lightbox__previousImage}>
              <Image
                className={styles.lightbox__previousImageIcon}
                src="/assets/images/icons/icon-previous.svg"
                alt="Previous image"
                width={12}
                height={12}
              />
            </button>
            <Image
              className={styles.lightbox__largeImage}
              src={images[currentLargeImageIndex].full}
              fill={true}
              alt="Product image"
            />
            <button onClick={increaseCurrentLargeImageIndex} className={styles.lightbox__nextImage}>
              <Image
                className={styles.lightbox__nextImageIcon}
                src="/assets/images/icons/icon-next.svg"
                alt="Next image"
                width={12}
                height={12}
              />
            </button>
          </div>

          <div className={styles.lightbox__thumbnails}>
            {images.map((image, index) => (
              <div
                onClick={() => setCurrentLargeImageIndex(index)}
                className={
                  currentLargeImageIndex === index
                    ? styles.lightbox__thumbnail + " " + styles["lightbox__thumbnail--active"]
                    : styles.lightbox__thumbnail
                }
                key={`thumbnail-${index}`}
              >
                <Image src={image.thumbnail} fill={true} alt="Thumbail" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
