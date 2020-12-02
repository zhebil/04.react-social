import React, { useState } from "react";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  icon: {
    fontSize: "14px",
  },
  key: {},
  likes: {
    color: "crimson",
  },
}));
const PhotoCard = (props) => {
  const classes = useStyle();
  const { webformatURL: src, tags, views, likes } = props.imageData;
  const { openModal } = props;
  return (
    <div className="photos__wrapp">
      <button onClick={openModal} className="photos__img">
        <img src={src} alt={tags} />
      </button>
      <div className="photos__descr">
        <div className="photos__descr-item">
          <div className="photos__descr-icon">
            <VisibilityIcon className={classes.icon + " " + classes.views} />
          </div>
          <p className="photos__descr-value">{views}</p>
        </div>
        <div className="photos__descr-item">
          <div className="photos__descr-icon">
            <FavoriteIcon className={classes.icon + " " + classes.likes} />
          </div>
          <p className="photos__descr-value">{likes}</p>
        </div>
        <div className="photos__descr-item f-100">
          <div className="photos__descr-icon">
            <VpnKeyOutlinedIcon className={classes.icon + " " + classes.key} />
          </div>
          <p className="photos__descr-value photos__descr-value--keywords">
            {tags.split(" ").map((item, i) => (
              <a key={i} href="/" className="link">
                {item}
              </a>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
