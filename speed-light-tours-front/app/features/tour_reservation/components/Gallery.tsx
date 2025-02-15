import React from "react";
import type {GalleryProps} from './types';

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="gallery">
      <img src={images[0]} alt="Main" />
      <div className="thumbnails">
        {images.slice(1).map((img, index) => (
          <img key={index} src={img} alt={`Thumbnail ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;