/* eslint-disable react/display-name */
import { IonIcon, IonLabel } from '@ionic/react';
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { addCircle, pencilOutline } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

import handlePictureClick from './handlePictureClick';
import './ImageUpload.css';

export interface ImageUploadRef {
  clickFileUpload(): void;
}

type ImageUploadProps = {
  title?: string;
  className?: string;
  placeHolderImg?: string;
  existingPictureURL?: string | null;
  onImageChange?: (
    imgInfo: {
      filename: string;
      imageFile: File | Blob | null;
    },
    pictureURL?: string
  ) => void;
  variant: 'add' | 'edit' | 'viewOnly';
};

const ImageUpload = React.forwardRef<ImageUploadRef, ImageUploadProps>(
  (
    {
      title,
      className,
      existingPictureURL,
      placeHolderImg,
      onImageChange,
      variant,
    }: ImageUploadProps,
    ref
  ) => {
    const alternativeImage = placeHolderImg ?? 'assets/no-image.webp';
    const [pictureURL, setPictureURL] = useState<string>(
      existingPictureURL ?? alternativeImage
    );
    const [imageFile, setImageFile] = useState<any>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (onImageChange) {
        if (imageFile) {
          const filename = `${uuid()}_${imageFile?.name ?? imageFile}`;

          onImageChange({ filename, imageFile }, pictureURL);
        }
      }
    }, [imageFile, pictureURL]);

    useImperativeHandle(
      ref,
      () => {
        return {
          clickFileUpload() {
            handlePictureClick(setPictureURL, setImageFile, fileInputRef);
          },
        };
      },
      []
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files.item(0);
        setImageFile(file);
        // @ts-ignore
        const pictureUrl = URL.createObjectURL(file);
        setPictureURL(pictureUrl);
      }
    };

    const iconToShow = variant === 'add' ? addCircle : pencilOutline;

    const imageWasNotChanged =
      pictureURL === alternativeImage || pictureURL === existingPictureURL;

    return (
      <div className={className ?? ''}>
        {title && (
          <IonLabel position="stacked" id="ImageUpload__label">
            {title}
          </IonLabel>
        )}
        <div className="ImageUpload__img-container">
          {imageWasNotChanged && variant !== 'viewOnly' && (
            <IonIcon
              className="ImageUpload__img-container-pencil"
              icon={iconToShow}
              onClick={() =>
                handlePictureClick(setPictureURL, setImageFile, fileInputRef)
              }
            />
          )}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={pictureURL}
            alt="placeholder car"
            onClick={() => {
              if (variant !== 'viewOnly')
                handlePictureClick(setPictureURL, setImageFile, fileInputRef);
            }}
            className="ImageUpload__img"
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              handlePictureClick(setPictureURL, setImageFile, fileInputRef)
            }
            data-filter={imageWasNotChanged}
          />
        </div>

        <input
          type="file"
          name="receipt-upload-input"
          aria-label="receipt-upload-input"
          id=""
          accept="image/*"
          onChange={handleFileChange}
          hidden
          ref={fileInputRef}
          role="button"
        />
      </div>
    );
  }
);

export default ImageUpload;
