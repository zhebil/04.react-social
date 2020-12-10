import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withJsonPlaceholderService } from "../hoc";
import { ErrorIndicator, Spinner } from "../utility";
import "./people-card.scss";
const PeopleCard = ({ people, jsonPlaceholderService }) => {
  const { id, name, email } = people;
  const [{ loading, error, photo }, setFetch] = useState({
    loading: true,
    error: false,
    photo: "",
  });

  useEffect(() => {
    let mounted = true;

    jsonPlaceholderService
      .getUserPhoto(id)
      .then((data) => {
        if (mounted) {
          setFetch({
            loading: false,
            error: false,
            photo: data.hits[0].webformatURL,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setFetch({
          loading: false,
          error: true,
          photo: "",
        });
      });

    return () => {
      mounted = false;
    };
  }, [jsonPlaceholderService, id]);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }
  return (
    <li className="peoples__item page-block">
      <div className="peoples__photo user-photo">
        <img src={photo} alt={name} />
      </div>
      <div className="peoples__descr">
        <Link to={`/home/${id}`} className="peoples__name">
          {name}
        </Link>
        <a href={`mailto:${email}`} className="peoples__mail link">{email}</a>
        <div className="peoples__link">
          <Button component={Link} variant="outlined" to={`/${id}/todos`}>
            Todos
          </Button>
          <Button
            component={Link}
            variant="outlined"
            color="secondary"
            to={`/${id}/photos`}
          >
            Фото
          </Button>
          <Button
            component={Link}
            variant="outlined"
            color="primary"
            to={`home/${id}`}
          >
            Детали
          </Button>
        </div>
      </div>
    </li>
  );
};

export default withJsonPlaceholderService()(PeopleCard);
