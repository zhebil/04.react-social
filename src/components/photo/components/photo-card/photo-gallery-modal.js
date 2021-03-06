import { Fade, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "./style.scss";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import SwiperCore, { Navigation } from "swiper";
const useStyle = makeStyles(() => ({
  close: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "100px",
    height: "100px",
    borderRadius: "0",
    zIndex: 2,
    "&:hover svg": {
      opacity: "1",
    },
    "@media(max-width: 768px)": {
      width: 50,
      height: 50,
    },
  },
  icon: {
    fontSize: "40px",
    opacity: "0.4",
    transition: "all 0.4s ease",
  },
}));
SwiperCore.use([Navigation]);

const PhotoGalleryModal = (props) => {
  const { open, initialSlide, photoData: photos, setOpen } = props;
  const classes = useStyle();

  const handleClose = () => {
    setOpen({ open: false, init: 0 });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="Фотогалерея"
    >
      <Fade in={open}>
        <div className="modal__paper">
          <IconButton onClick={handleClose} className={classes.close}>
            <CloseIcon className={classes.icon} />
          </IconButton>
          <Swiper
            preloadImages={false}
            lazy={{ loadPrevNext: true }}
            slidesPerView={1}
            navigation
            className={"modal__swiper"}
            initialSlide={initialSlide}
            breakpoints={{}}
          >
            {photos.map((item) => {
              return (
                <SwiperSlide className={"modal__swiper-slide"} key={item.id}>
                  <div className="photo-gallery__slide">
                    <img src={item.largeImageURL} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Fade>
    </Modal>
  );
};

export default PhotoGalleryModal;
