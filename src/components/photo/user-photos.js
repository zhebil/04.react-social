import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "./photo.scss";
import { withJsonPlaceholderService } from "../hoc";
import { ErrorIndicator, GoFull, Spinner } from "../utility";
import PhotoCard from "./components/photo-card/photo-card";
import PhotoGalleryModal from "./components/photo-card/photo-gallery-modal";

const UserPhotos = (props) => {
  const { jsonPlaceholderService, id } = props;
  const [photoData, setPhotoData] = useState([]);
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [modal, setModal] = useState({ open: false, init: 0 });
  useEffect(() => {
    let mount = true;
    jsonPlaceholderService
      .getUserPhotos(id)
      .then((data) => {
        if (mount) {
          setPhotoData(data.hits);
          setFetch({ loading: false, error: false });
        }
      })
      .catch((e) => {
        console.log(e);
        setFetch({ loading: false, error: true });
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
    <div className="photos">
      <div className="page-block">
        <h2 className="photos__title page-block__title">Мои фото</h2>
        <div className="photos__body">
          <Swiper
            slidesPerView={2}
            freeMode={true}
            // freeModeMomentum={false}
            // freeModeMomentumBounce={false}
            watchOverflow={true}
            breakpoints={{
              1200: { slidesPerView: 4 },
              768: {slidesPerView: 3}
            }}
          >
            {photoData.map((item, i) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="photos__slide">
                    <PhotoCard
                      openModal={() => {
                        setModal({ open: true, init: i });
                      }}
                      imageData={item}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="right__link">
        <GoFull path={`/${id}/photos`} />
      </div>

      <PhotoGalleryModal
        open={modal.open}
        photoData={photoData}
        initialSlide={modal.init}
        setOpen={setModal}
      />
    </div>
  );
};
export default withJsonPlaceholderService()(UserPhotos);
