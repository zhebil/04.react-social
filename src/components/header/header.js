import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "./header.scss";
import { makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Logo } from "../icons";
import Menu from "../menu";
import { withJsonPlaceholderService } from "../hoc";
import { TabletMobile, TabletDesktop } from "../utility/media";
const useStyles = makeStyles(() => ({
  avatar: {
    width: "70px",
    height: "70px",
    marginRight: "10px",
  },
  myPageButton: {
    backgroundColor: "#ff9331",
    color: "white",
    width: 110,
    height: 40,
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
}));
function Header(props) {
  const myId = window.localStorage.getItem("myId");

  const [openMenu, setOpenMenu] = useState(false);
  const [userPhoto, setPhoto] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (myId) {
      props.jsonPlaceholderService.getUserPhoto(myId).then((data) => {
        setPhoto(data.hits[0].webformatURL);
      });
    }
  }, [props.jsonPlaceholderService, myId]);
  const classes = useStyles();
  const logOut = () => {
    localStorage.removeItem("myId");
    history.push("/");
    setPhoto("");
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <div className="logo">
              <Logo />
            </div>
            <p>React Social</p>
          </Link>
          <Menu
            closeMenu={() => {
              setOpenMenu(false);
            }}
            logOut={logOut}
            openMenu={openMenu}
            myId={myId}
          />
          {myId ? (
            <>
              <Avatar src={userPhoto} alt="ava" className={classes.avatar} />

              <TabletDesktop>
                <Button
                  component={Link}
                  to={`/sign-up`}
                  variant="contained"
                  className={`${classes.myPageButton}`}
                  onClick={logOut}
                >
                  Выход
                </Button>
              </TabletDesktop>
            </>
          ) : (
            <TabletDesktop>
              <Button
                variant="contained"
                component={Link}
                to={`/sign-up`}
                className={classes.myPageButton}
              >
                Регистрация
              </Button>
            </TabletDesktop>
          )}
          <TabletMobile>
            <button
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className={`menu__burger ${openMenu && "manu__burger--active"}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </TabletMobile>
        </div>
      </div>
    </header>
  );
}
export default withJsonPlaceholderService()(Header);
