import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./registrationPage.module.css";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  return (
    <div className={styles.regContainer}>
      <div className={styles.regGoods}>
        <a> 상품 등록하기 </a>
        <button className={styles.regBtn}>등록</button>
      </div>
      <div className={styles.regInfo}>
        <a> 상품명 </a>
        <input
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="상품명을 입력해주세요."
          className={styles.productInfoInput}
        />
      </div>
      <div className={styles.regInfo}>
        <a> 상품 소개 </a>
        <input
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="상품 소개를 입력해주세요."
          className={styles.productDescriptionInput}
        />
      </div>
      <div className={styles.regInfo}>
        <input
          name="price"
          value={price}
          onChange={handlePriceChange}
          placeholder="판매 가격을 입력해주세요."
          className={styles.productInfoInput}
        />
      </div>
      <div className={styles.regTags}>
        <input
          name="tags"
          value={tags}
          onChange={handleTagsChange}
          placeholder="태그를 입력해주세요."
          className={styles.productInfoInput}
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
