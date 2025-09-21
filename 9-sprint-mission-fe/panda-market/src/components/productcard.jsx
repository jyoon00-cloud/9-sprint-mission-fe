import React from "react";
import styles from "./ProductCard.module.css";

const formatPrice = (price) => {
  // 가격 표시
  return new Intl.NumberFormat("ko-KR").format(price);
};

function ProductCard({ product, isBest = false }) {
  // 베스트 상품 구분
  const cardStyle = isBest ? `${styles.card} ${styles.best}` : styles.card;
  const imageUrl = product.images;

  return (
    <div className={cardStyle}>
      <img src={imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{formatPrice(product.price)}원</p>
        <div className={styles.meta}>
          <span>♡ {product.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
