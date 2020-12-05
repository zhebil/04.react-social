import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { withJsonPlaceholderService } from "../hoc";
import PhotoCard from "../photo/components/photo-card/photo-card";
import PhotoGalleryModal from "../photo/components/photo-card/photo-gallery-modal";
import { ErrorIndicator, Spinner } from "../utility";
const Photos = (props) => {
  const { jsonPlaceholderService } = props;
  const [photoData, setPhotoData] = useState([]);
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [modal, setModal] = useState({ open: false, init: 0 });
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
  return (
    <>
      <div className="page-block photos">
        <h2 className="photos__title page-block__title">Мои фото</h2>
        <ul className="photos__list">
          {photoData.map((item, i) => {
            return (
              <li className="photos__item">
                <PhotoCard
                  openModal={() => {
                    setModal({ open: true, init: i });
                  }}
                  imageData={item}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <PhotoGalleryModal
        open={modal.open}
        photoData={photoData}
        initialSlide={modal.init}
        setOpen={setModal}
      />
    </>
  );
};

export default withJsonPlaceholderService()(Photos);
