import React from "react";
import { Logo } from "../icons";
import TelegramIcon from "@material-ui/icons/Telegram";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./footer.scss"
import InstIcon from "../icons/instIcon";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <div className="logo">
              <Logo />
            </div>
            <p>React Social</p>
          </div>
          <div className="footer__contacts">
          <p className="footer__text">Контакты:</p>
            <a href="https://t.me/zhebil" className="footer__item footer__item--telegram">
                <TelegramIcon />
             </a>
            <a href="https://www.instagram.com/zhebil/" className="footer__item footer__item--inst">
            <InstIcon/>
             </a>
            <a href="https://github.com/zhebil" className="footer__item footer__item--github">
                <GitHubIcon />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
