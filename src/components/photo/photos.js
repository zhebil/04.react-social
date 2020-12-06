import React, { useState } from "react"
import PhotoCard from "./components/photo-card/photo-card";
import PhotoGalleryModal from "./components/photo-card/photo-gallery-modal";

const Photos = (props) => {
    const { photoData } = props;
    const [modal, setModal] = useState({ open: false, init: 0 });
  
    return (
      <>
        <div className="photos">
          <h2 className="photos__title title">Мои фото</h2>
          <ul className="photos__list">
            {photoData.map((item, i) => {
              return (
                <li key={item.id}  className="photos__item">
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

  export default Photos