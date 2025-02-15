import React from "react";
import ImageGallery from 'react-image-gallery';
import type { GalleryProps } from './types';
import 'react-image-gallery/styles/css/image-gallery.css';


const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const galleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="gallery">
      <ImageGallery items={galleryImages} showThumbnails={true} />
    </div>
  );
};

export default Gallery;