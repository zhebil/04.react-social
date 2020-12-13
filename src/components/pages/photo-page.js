import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { compose } from "redux";
import { withJsonPlaceholderService } from "../hoc";
import { Photos } from "../photo";
import { ErrorIndicator, GoBack, Spinner } from "../utility";

const PhotoPage = (props) => {
  const { jsonPlaceholderService, myId } = props;
  const [photoData, setPhotoData] = useState([]);
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const match = useRouteMatch("/:id/photos");
  const id = match.params.id;

  useEffect(() => {
    let mount = true;
    jsonPlaceholderService.getUserPhotos(id).then((data) => {
      if (mount) {
        setPhotoData(data.hits);
        setFetch({ loading: false, error: false });
      }
    }).catch(e=> {
      console.log(e);
      setFetch({loading: false, error: true})
    });;
    return () => {
      mount = false;
    };
  }, [jsonPlaceholderService, id]);
  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }
  return (
    <section className="photos__page">
      <div className="photos">
        <div className="container">
          <GoBack />

          <h2 className="photos__title title">
            {myId === id ? "Мои фото" : "Фото"}
          </h2>
          <div className="page-block">
            <Photos cardCount={4} photoData={photoData} />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ myId: state.userInfo.userId });

export default compose(
  connect(mapStateToProps),
  withJsonPlaceholderService()
)(PhotoPage);
