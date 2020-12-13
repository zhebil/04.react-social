import { IconButton, makeStyles } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
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
function Item({ item, itemId, setFavourite, setCompleted, deleteTodo }) {
  const classes = useStyle();
  const { title, id, isFavourite } = item;
  const [disabled, setDisabled] = useState(false);
  return (
    <>
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
            setDisabled(true);
          }}
          disabled={disabled}
          className={classes.button}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
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

const TodoItem = connect(null, mapDispatchToProps)(Item);

const TodoItemRef = forwardRef((props, ref) => (
  <li
    className={`todo__item 
  ${props.item.completed ? "todo__completed" : ""} 
  ${props.item.isFavourite ? "todo__favourite" : ""}
  `}
    ref={ref}
  >
    <TodoItem item={props.item} itemId={props.itemId} />
  </li>
));
export default TodoItemRef;
