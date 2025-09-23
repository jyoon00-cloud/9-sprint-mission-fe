import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import homeTop from "../assets/Img_home_top.png";
import home01 from "../assets/Img_home_01.png";
import home02 from "../assets/Img_home_02.png";
import home03 from "../assets/Img_home_03.png";

function LandingPage() {
  return (
    <main>
      <div className={styles.home}>
        <div className={styles.homeBox}>
          <div className={styles.homeTextBox}>
            <span id={styles.homeText}>
              일상의 모든 물건을 <br />
              거래해 보세요
            </span>
            <Link className={styles.button1} to="/items">
              구경하러 가기
            </Link>
          </div>
          <img id={styles.imgHomeTop} src={homeTop} />
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <img className={styles.contentImg} src={home01} />
            <div className={styles.contentTextBox}>
              <div className={styles.contentHeader}>Hot item</div>
              <div className={styles.contentTitle}>
                인기 상품을
                <br />
                확인해 보세요
              </div>
              <div className={styles.contentInfo}>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentBox} id={styles.reversecon}>
            <div id={styles.secondContent} className={styles.contentTextBox}>
              <div className={styles.contentHeader}>Search</div>
              <div className={styles.contentTitle}>
                구매를 원하는
                <br />
                상품을 검색하세요
              </div>
              <div className={styles.contentInfo}>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </div>
            </div>
            <img className={styles.contentImg} src={home02} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <img className={styles.contentImg} src={home03} />
            <div className={styles.contentTextBox}>
              <div className={styles.contentHeader}>Register</div>
              <div className={styles.contentTitle}>
                판매를 원하는
                <br />
                상품을 등록하세요
              </div>
              <div className={styles.contentInfo}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
