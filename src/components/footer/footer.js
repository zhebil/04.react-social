import React from "react";
import { Logo } from "../icons";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo logo">
        <Logo />
      </div>
      <div className="footer__contacts">
        <a href="https://t.me/zhebil" className="footer__item">
          <span className="footer__item-img">
            <TelegramIcon />
          </span>
        </a>
        <a href="https://www.instagram.com/zhebil/" className="footer__item">
          <span className="footer__item-img">
            <InstagramIcon />
          </span>
        </a>
        <a href className="footer__item">
          <span className="footer__item-img">
            <GitHubIcon />
          </span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
