import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import pandaLogo from "../assets/Panda_logo.png";
import mobileLogo from "../assets/mobile_logo.png";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerbox}>
        <div className={styles.leftHeader}>
          <Link to="/">
            <picture>
              <source srcSet={mobileLogo} media="(max-width: 743px)" />
              <img id="header-logo" src={pandaLogo} />
            </picture>
          </Link>
          <Link id="community" to="/login">
            자유게시판
          </Link>
          <Link id="usedmarket" to="/login">
            중고마켓
          </Link>
        </div>
        <div className={styles.rightHeader}>
          <Link className={styles.loginButton} to="/login">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
