import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFocus } from "../../hooks";
import { withJsonPlaceholderService } from "../hoc";
import { Photos } from "../photo";
import { ErrorIndicator, GoFull, Spinner } from "../utility";
import "./scss/photo-search.scss";
// q="100symbols"
// lang
// image_type = all, photo, illustration, vector
// order= popular, latest
// page
// per_page

const useStyle = makeStyles(() => ({
  button: {
    backgroundColor: "#ff9331",
    color: "white",
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
}));
const PhotoSearch = (props) => {
  const classes = useStyle();
  const { jsonPlaceholderService } = props;
  const [value, setValue] = useState("");
  const match = useRouteMatch("/photos/:params");
  const params = match.params.params;
  const [photoData, setPhotoData] = useState([]);
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [inputRef, setInputFocus] = useFocus();
  const history = useHistory();
  useEffect(() => {
    if (params === "start") {
    } else {
      setFetch({ loading: true, error: false });
   
      jsonPlaceholderService
        .getSearchPhotos(`&per_page=50&${params}`)
        .then((data) => {
          if (data.hits.length === 0) {
            throw new Error();
          }
          setPhotoData(data.hits);
          setFetch({ loading: false, error: false });
        })
        .catch((err) => {
          console.log(err);
          setFetch({ loading: false, error: true });
        });
    }
  }, [params, jsonPlaceholderService]);

  const photos =
    params === "start" ? (
      <p className="search__message">Введите значение для поиска</p>
    ) : fetch.loading ? (
      <Spinner />
    ) : fetch.error ? (
      <ErrorIndicator />
    ) : (
      <>
        <Photos photoData={photoData} />
        <GoFull text="Следующая страница" path={params.replace(/&page=.+/, "") + "&page=" + 2} />
      </>
    );

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.search.value.trim().length === 0) {
      setInputFocus();
      return;
    }
    const q = e.target.search.value.split(" ").join("+");
    const lang = e.target.lang.value;
    const order = e.target.order.value;
    const imageType = e.target.image_type.value;
    const requestParams = `q=${q}&lang=${lang}&order=${order}&image_type=${imageType}`;
    history.push(`/photos/${requestParams}`);
    console.log(requestParams);
  };
  return (
    <>
      <div className="container">
        <h1>Найти фото</h1>
        <form onSubmit={onSubmit} className="search__body clear">
          <div className="search__row page-block">
            <TextField
              inputProps={{ ref: inputRef }}
              name="search"
              value={value}
              onChange={(e) => {
                if (e.target.value.length >= 100) return false;
                setValue(e.target.value);
              }}
              fullWidth
              label="Найти фото"
            />
            <FormControl className={classes.select}>
              <NativeSelect
                defaultValue={"en"}
                name="lang"
                inputProps={{ "aria-label": "language" }}
              >
                <option value={"ru"}>ru</option>
                <option value={"en"}>en</option>
                <option value={"de"}>de</option>
                <option value={"da"}>da</option>
                <option value={"es"}>es</option>
                <option value={"id"}>id</option>
                <option value={"it"}>it</option>
                <option value={"no"}>no</option>
                <option value={"pl"}>pl</option>
                <option value={"pt"}>pt</option>
                <option value={"pt"}>pt</option>
                <option value={"pt"}>pt</option>
                <option value={"pt"}>pt</option>
                <option value={"pt"}>pt</option>
                <option value={"cs"}>cs</option>
              </NativeSelect>
              <FormHelperText>Язык поиска</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Найти
            </Button>
          </div>

          <div className="search__panel page-block">
            <h2 className="search__filters">Фильтры</h2>
            <FormControl variant="filled">
              <InputLabel className={classes.label} id="order">
                Фильтр
              </InputLabel>
              <Select
                name={"order"}
                labelId="order"
                value={"popular"}
                className={classes.select}
                // onChange={(event) => {
                //   setSort(event.target.value);
                // }}
              >
                <MenuItem value={"popular"}>Сначала популрные</MenuItem>
                <MenuItem value={"latest"}>Сначала новые</MenuItem>
              </Select>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Тип изображений</FormLabel>
              <RadioGroup
                defaultValue="all"
                aria-label="image type"
                name="image_type"
              >
                <FormControlLabel
                  value="all"
                  control={<Radio inputProps={{ "aria-label": "all" }} />}
                  label="Все"
                />
                <FormControlLabel
                  value="photo"
                  control={<Radio inputProps={{ "aria-label": "photo" }} />}
                  label="Фотографии"
                />
                <FormControlLabel
                  value="illustration"
                  control={
                    <Radio inputProps={{ "aria-label": "illustration" }} />
                  }
                  label="Иллюстрации"
                />
                <FormControlLabel
                  value="vector"
                  control={<Radio inputProps={{ "aria-label": "vector" }} />}
                  label="Векторные"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="search__result page-block">{photos}</div>
        </form>
      </div>
    </>
  );
};
export default withJsonPlaceholderService()(PhotoSearch);
