import React, { useState } from "react";
import PhotoCard from "./components/photo-card/photo-card";
import PhotoGalleryModal from "./components/photo-card/photo-gallery-modal";

const Photos = (props) => {
  const { photoData, cardCount = 3 } = props;
  const [modal, setModal] = useState({ open: false, init: 0 });

  return (
    <>
      <ul className="photos__list">
        {photoData.map((item, i) => {
          return (
            <li
              key={item.id}
              className={`photos__item photos__item-${cardCount}`}
            >
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

      <PhotoGalleryModal
        open={modal.open}
        photoData={photoData}
        initialSlide={modal.init}
        setOpen={setModal}
      />
    </>
  );
};

export default Photos;
