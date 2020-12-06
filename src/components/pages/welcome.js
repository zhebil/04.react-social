import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  NativeSelect,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { register } from "../../actions";
import "./scss/welcome.scss";
const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: "#ff9331",
    color: "white",
    height: "50px",
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
  input: {
    marginBottom: "20px",
    fontSize: "1.2rem",
    "& div": {
      fontSize: "1.2rem"
    }
  },
  select: {
    marginBottom: "30px",
    width: "100px",
    marginLeft: "auto",
  },
}));
function Welcome({ onRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
  const classes = useStyles();
  function handleSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem("myId", e.target.id.value);
    onRegister(e.target.id.value);
    history.push("/people")
  }
  return (
    <section className="welcome">
      <div className="container">
        <div className="welcome__inner">
          <h1 className="welcome__title title">Приветствую на React Social</h1>
          <p className="welcome__login-text">
            Эта регистрация условная, данные не будут сохранены
          </p>
          <form onSubmit={handleSubmit} className="welcome__login page-block">
            <TextField
              id="outlined-error-helper-text"
              label="Login"
              name="login"
              variant="outlined"
              required
              className={classes.input}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput className={classes.input}
                id="password"
                type={showPassword ? "text" : "password"}
                // value=""
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <FormControl className={classes.select}>
              <NativeSelect name="id" inputProps={{ "aria-label": "id" }}>
                <option value="" disabled>
                  Id
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </NativeSelect>
              <FormHelperText>Выберите Id</FormHelperText>
            </FormControl>
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
              color="primary"
            >
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onRegister: register,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
