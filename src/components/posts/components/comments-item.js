import React from "react";
import { onTransformText } from "../../utility/functions";

export default function CommentsItem(props) {
  const { photo, email, body: text } = props.comment;

  return (
    <li className="comments__item">
      <div className="comments__photo user-photo">
        <img src={photo} alt={email} />
      </div>
      <div className="comments__body">
        <h4 className="comments__name link"> {email}</h4>
        <p className="comments__text">{onTransformText(text)}</p>
      </div>
    </li>
  );
}

