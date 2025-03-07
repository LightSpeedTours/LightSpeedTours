import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import type { TourProps } from '../utils/types';

const Gallery: React.FC<Pick<TourProps, 'images'>> = ({ images }) => {
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
