import React, { useState } from "react";
import { GoFull } from "../utility";
import TodoItem from "./components/todo-item";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

import FlipMove from "react-flip-move";
const useStyle = makeStyles(() => ({
  select: {
    height: "40px",
    "&:before": {
      borderBottomColor: "#ff9331",
    },
    "&:hover:before": {
      borderBottomWidth: "2px",
      borderBottomColor: "#ff9331",
    },
  },
  label: {
    fontSize: "",
  },
}));

const Todo = (props) => {
  const classes = useStyle();
  const { todos, id, isPage } = props;
  const [sort, setSort] = useState("last");
  const sortedTodos = () => {
    switch (sort) {
      case "last":
        return todos.sort((a, b) => b.id - a.id);
      case "not-completed":
        return todos.sort((a, b) => a.completed - b.completed);
      case "completed":
        return todos.sort((a, b) => b.completed - a.completed);
      case "favourite":
        return todos.sort((a, b) => b.isFavourite - a.isFavourite);
      default:
        break;
    }
  };
  return (
    <>
      <div className="home__todo todo page-block">
        <div className="todo__row">
          <h2 className="todo__title page-block__title">
            Что мне нужно сделать?
            <span className="todo__count">({todos.length})</span>
          </h2>
          <div className="todo__filters">
            <FormControl variant="filled">
              <InputLabel className={classes.label} id="todo-fiter">
                Фильтр
              </InputLabel>
              <Select
                labelId="todo-filter"
                value={sort}
                className={classes.select}
                onChange={(event) => {
                  setSort(event.target.value);
                }}
              >
                <MenuItem value={"last"}>Сначала новые</MenuItem>
                <MenuItem value={"favourite"}>Сначала важные</MenuItem>
                <MenuItem value={"not-completed"}>
                  Сначала невыполненые
                </MenuItem>
                <MenuItem value={"completed"}> Сначала выполненые</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <FlipMove
          appearAnimation={true}
          typeName={"ul"}
          className={isPage ? "todo__alt-list" : "todo__list"}
        >
          {todos.length > 0 ? (
            isPage ? (
              sortedTodos().map((todo, itemId) => {
                return <TodoItem key={todo.id} item={todo} itemId={itemId} />;
              })
            ) : (
              sortedTodos()
                .slice(0, 5)
                .map((item, itemId) => {
                  return <TodoItem key={item.id} item={item} itemId={itemId} />;
                })
            )
          ) : (
            <p className="todos__message">Список дел пустой</p>
          )}
        </FlipMove>
      </div>
      {!isPage && (
        <div className="right__link">
          <GoFull path={`/${id}/todos`} />
        </div>
      )}
    </>
  );
};
export default Todo;
