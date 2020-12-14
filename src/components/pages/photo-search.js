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
import { ErrorIndicator, GoBack, GoFull, Spinner } from "../utility";
import { Mobile } from "../utility/media";
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
    width: 280,
    maxWidth: "100%",
    height: 40,
    "&:hover": {
      backgroundColor: "#a65810",
    },
    "@media(max-width: 768px)": {
      fontSize: 14,
      height: 35,
    },
  },
  select: {
    minWidth: "100px",
    marginLeft: 10,
    "& select": {
      fontSize: 18,
    },
  },
  input: {
    "& label": {
      fontSize: "18px",
    },
    "& input": {
      fontSize: "18px",
    },
  },
  menu: {
    width: "100%",
    marginBottom: 15,
  },
  radio: {
    "& svg": {
      fill: "#ff9331",
    },
  },
}));
const PhotoSearch = (props) => {
  const classes = useStyle();
  const { jsonPlaceholderService } = props;
  const [value, setValue] = useState("");
  const [order, setOrder] = useState("popular");
  const [viewFilter, setViewFilter] = useState(false);
  const match = useRouteMatch("/photos/:params");
  const params = match.params.params;
  const [photoData, setPhotoData] = useState({});
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [inputRef, setInputFocus] = useFocus();
  const history = useHistory();
  useEffect(() => {
    if (params === "start") {
    } else {
      setFetch({ loading: true, error: false });

      jsonPlaceholderService
        .getSearchPhotos(`&per_page=50&page=1&${params}`)
        .then((data) => {
          if (data.hits.length === 0) {
            throw new Error();
          }
          setPhotoData(data);
          setFetch({ loading: false, error: false });
        })
        .catch((err) => {
          console.log(err);
          setFetch({ loading: false, error: true });
        });
    }
  }, [params, jsonPlaceholderService]);
  const photos = () => {
    let idx = 1;
    if (photoData.total > photoData.hits.length) {
      let regex = /(?<=page=)\d+/;
      if (params.match(regex)) {
        idx = params.match(regex)[0];
      }
    }
    console.log(photoData.totalHits);

    return (
      <>
        {idx > 1 && (
          <GoFull
            text="Назад"
            direction="left"
            path={params.replace(/&page=.+/, "") + "&page=" + (idx - 1)}
          />
        )}
        <Photos photoData={photoData.hits} />
        {photoData.total > photoData.hits.length &&
          idx < photoData.total / 50 &&
          idx < 11 && (
            <GoFull
              text="Следующая страница"
              path={params.replace(/&page=.+/, "") + "&page=" + (+idx + 1)}
            />
          )}
      </>
    );
  };
  const content =
    params === "start" ? (
      <p className="search__message">Введите значение для поиска</p>
    ) : fetch.loading ? (
      <Spinner />
    ) : fetch.error ? (
      <p className="search__error">
        По вашему запросу ничего не найдено. Попробуйте еще раз
      </p>
    ) : (
      photos()
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
  };
  return (
    <section className="search">
      <div className="container">
        <GoBack />

        <h1 className="title search__title">Найти фото</h1>
        <form onSubmit={onSubmit} className="search__body clear">
          <div className="search__panel page-block">
            <div className="search__row">
              <TextField
                inputProps={{ ref: inputRef }}
                name="search"
                value={value}
                className={classes.input}
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
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Найти
            </Button>
          </div>

          <div className={`search__aside page-block`}>
            <div className="search__row jc-sb">
              <h2 className="search__filters">Фильтры </h2>
              <Mobile>
                <button
                  type={"button"}
                  onClick={() => {
                    setViewFilter(!viewFilter);
                  }}
                  className="menu__burger search__burger"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </Mobile>
            </div>
            <div
              className={`search__filter-wrapper ${
                !viewFilter && "visually-hidden"
              }`}
            >
              <FormControl className={classes.menu} variant="filled">
                <InputLabel className={classes.label} id="order">
                  Фильтр
                </InputLabel>
                <Select
                  name={"order"}
                  labelId="order"
                  value={order}
                  onChange={(event) => {
                    setOrder(event.target.value);
                  }}
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
                    control={
                      <Radio
                        className={classes.radio}
                        inputProps={{ "aria-label": "all" }}
                      />
                    }
                    label="Все"
                  />
                  <FormControlLabel
                    value="photo"
                    control={
                      <Radio
                        className={classes.radio}
                        inputProps={{ "aria-label": "photo" }}
                      />
                    }
                    label="Фотографии"
                  />
                  <FormControlLabel
                    value="illustration"
                    control={
                      <Radio
                        className={classes.radio}
                        inputProps={{ "aria-label": "illustration" }}
                      />
                    }
                    label="Иллюстрации"
                  />
                  <FormControlLabel
                    value="vector"
                    control={
                      <Radio
                        className={classes.radio}
                        inputProps={{ "aria-label": "vector" }}
                      />
                    }
                    label="Векторные"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Найти
              </Button>
            </div>
          </div>
          <div className="search__result page-block">{content}</div>
        </form>
      </div>
    </section>
  );
};
export default withJsonPlaceholderService()(PhotoSearch);
