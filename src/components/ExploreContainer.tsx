import React from 'react';
import ImageUpload from './ImageUpload';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <ImageUpload
        placeHolderImg="assets/no-image.webp"
        onImageChange={(data: any, pictureURL: any) => {
          console.log('imageChange', data, pictureURL);
        }}
        variant="add"
      />
    </div>
  );
};

export default ExploreContainer;
