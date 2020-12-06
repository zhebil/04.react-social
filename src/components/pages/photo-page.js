import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { withJsonPlaceholderService } from "../hoc";
import { Photos } from "../photo";
import { ErrorIndicator, Spinner } from "../utility";

const PhotoPage = (props) => {
  const { jsonPlaceholderService } = props;
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
    });
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
  console.log(photoData);
  return (
    <div className="page-block photos__page">
      <Photos photoData={photoData} />
    </div>
  );
};

export default withJsonPlaceholderService()(PhotoPage);
