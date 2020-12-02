import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteTodo, setCompleted, setFavourite } from "../../../../actions";
import { DeleteIcon } from "../../../icons";
import StarIcon from "@material-ui/icons/Star";
import "./todo-item.scss";
const useStyle = makeStyles(() => ({
  button: {
    padding: "5px",
  },
  star: {
    stroke: "#00a6a4",
    color: "transparent",
  },
  activeStar: {
    stroke: "#ff9331",
    color: "#ff9331",
  },
}));
function TodoItem({ item, itemId, setFavourite, setCompleted, deleteTodo }) {
  const classes = useStyle();
  const { title, completed, id, isFavourite } = item;

  return (
    <li
      className={`todo__item 
      ${completed ? "todo__completed" : ""} 
      ${isFavourite ? "todo__favourite" : ""}
      `}
    >
      <div className="todo__number">{itemId + 1}</div>
      <div
        onClick={() => {
          setCompleted(id);
        }}
        className="todo__name"
      >
        {title}
      </div>
      <div className="todo__buttons">
        <IconButton
          onClick={() => {
            setFavourite(id);
          }}
          className={classes.button}
          aria-label="favorite"
        >
          <StarIcon
            className={`${classes.star} ${
              isFavourite ? classes.activeStar : ""
            }`}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteTodo(id);
          }}
          className={classes.button}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setFavourite: setFavourite,
      setCompleted: setCompleted,
      deleteTodo: deleteTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(TodoItem);
