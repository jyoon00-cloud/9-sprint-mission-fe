import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import facebookIcon from "../assets/ic_facebook.png";
import twitterIcon from "../assets/ic_twitter.png";
import youtubeIcon from "../assets/ic_youtube.png";
import instagramIcon from "../assets/ic_instagram.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottomBox}>
        <div className={styles.footerCodeit}>@codeit -2024</div>
        <div className={styles.footerLink}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className={styles.footerSns}>
          <a target="_blank" href="https://www.facebook.com/">
            <img className={styles.snsImg} src={facebookIcon} />
          </a>
          <a target="_blank" href="https://www.twitter.com/">
            <img className={styles.snsImg} src={twitterIcon} />
          </a>
          <a target="_blank" href="https://youtube.com/">
            <img className={styles.snsImg} src={youtubeIcon} />
          </a>
          <a target="_blank" href="https://instagram.com/">
            <img className={styles.snsImg} src={instagramIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
