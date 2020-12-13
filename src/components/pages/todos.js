import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { addTodo, todoLoaded } from "../../actions";
import { withJsonPlaceholderService } from "../hoc";
import Todo from "../todo";
import { ErrorIndicator, GoBack, Spinner } from "../utility";
import StarIcon from "@material-ui/icons/Star";
import { useFocus } from "../../hooks";

const useStyle = makeStyles(() => ({
  button: {
    backgroundColor: "#ff9331",
    color: "white",
    height: "50px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
  star: {
    stroke: "#00a6a4",
    color: "transparent",
    fontSize: "2.5rem",
  },
  activeStar: {
    stroke: "#ff9331",
    color: "#ff9331",
  },
  input: {
    "& label": {
      fontSize: "18px",
    },
    "& input": {
      fontSize: "18px",
    },
  },
}));

const Todos = ({ jsonPlaceholderService, todoLoaded, todos, addTodo }) => {
  const classes = useStyle();
  const [value, setValue] = useState("");
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const match = useRouteMatch("/:id/todos");
  const id = match.params.id;
  useEffect(() => {
    jsonPlaceholderService
      .getUserTodos(id)
      .then((data) => {
        todoLoaded(data);
        setFetch({ loading: false, error: false });
      })
      .catch((err) => {
        console.log(err);
        setFetch({ loading: false, error: true });
      });
  }, [id, jsonPlaceholderService, todoLoaded]);
  const [inputRef, setInputFocus] = useFocus();
  const onTodoChange = (e) => {
    setValue(e.target.value);
  };
  const getId = () => {
    return Math.floor(Math.random() * (100000 - 500 + 1)) + 500;
  };
  const getTodo = (todo, isFavourite) => {
    return {
      completed: false,
      isFavourite: isFavourite,
      title: todo,
      userId: id,
      id: getId(),
    };
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.todo.value.trim().length === 0) {
      setInputFocus();
      return;
    }
    addTodo(getTodo(e.target.todo.value, e.target.isFavourite.checked));
    setValue("");
  };

  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }
  return (
    <section className="todo__page">
      <div className="container">
        <GoBack />
        <h1 className="title">Список дел</h1>
        <form onSubmit={onSubmit} className="todo__input page-block">
          <div className="todo__input-row">
            <TextField
              inputProps={{ ref: inputRef }}
              name="todo"
              value={value}
              className={classes.input}
              onChange={onTodoChange}
              fullWidth
              label="Что мне нужно сделать?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarIcon className={`${classes.star}`} />}
                  checkedIcon={
                    <StarIcon
                      className={`${classes.star} ${classes.activeStar}`}
                    />
                  }
                  name="isFavourite"
                />
              }
            />
          </div>
          <Button type="submit" variant="contained" className={classes.button}>
            Добавить в список
          </Button>
        </form>

        <Todo isPage={true} todos={todos} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    userId: state.userInfo.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      todoLoaded: todoLoaded,
      addTodo: addTodo,
    },
    dispatch
  );
};

export default compose(
  withJsonPlaceholderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Todos);
