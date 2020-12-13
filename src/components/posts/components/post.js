import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SeeMore } from "../../utility";
import { onTransformText } from "../../utility/functions";
import Comments from "./comments";
import "./post.scss";

const Post = (props) => {
  const { post, isFirst, userPhoto, userName, userMail, idx } = props;
  const { postPhoto: image, title, body: postText, id: postId } = post;
  const [isLarge, setIsLarge] = useState(false);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    if (postText.length > 400) {
      setIsLarge(true);
    }
  }, [postText]);
  return (
    <div
      className={`posts__item post-item page-block ${
        isFirst ? "page-block--first" : ""
      }`}
    >
      <div className="post-item__head">
        <div className="post-item__user-photo user-photo">
          <img src={userPhoto} alt={`avatar ${userName}`} />
        </div>
        <div className="post-item__user-data">
          <h3 className="post-item__user-name">{userName}</h3>
          <a href={`mailto:${userMail}`} className="post-item__user-mail link">
            {userMail}
          </a>
        </div>
      </div>
      <div className="post-item__body">
        <div className="post-item__img">
          <img src={image} alt={title} />
        </div>
        <h3 className="post-item__title">{onTransformText(title)}</h3>
        <p
          className="post-item__text"
          onClick={() => {
            if (postText.length > 400) setIsLarge(!isLarge);
          }}
        >
          {isLarge ? postText.substring(0, 401) + "..." : postText}
        </p>
        {isLarge ? (
          <div className="right__link">
            <SeeMore
              setMore={() => {
                setIsLarge(!isLarge);
              }}
              more={!isLarge}
            />
          </div>
        ) : null}
      </div>
      <div className="post-item__footer">
        <CSSTransition
          classNames="my-node"
          in={viewComments}
          timeout={5000}
          unmountOnExit
          appear={true}
        >
          <div>
            <Comments id={postId} idx={idx} />
          </div>
        </CSSTransition>

        <button
          onClick={() => {
            setViewComments(!viewComments);
          }}
          className="post-item__button"
        >
          Комментарии
        </button>
      </div>
    </div>
  );
};
export default Post;
