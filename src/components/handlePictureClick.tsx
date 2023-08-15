import React from 'react';
import { isPlatform } from '@ionic/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const handlePictureClick = async (
  setPictureURL: React.Dispatch<React.SetStateAction<string>>,
  setImageFile: React.Dispatch<any>,
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  if (isPlatform('capacitor') || isPlatform('ios')) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        width: 600,
        source: CameraSource.Prompt,
      });

      if (photo.webPath) {
        setPictureURL(photo.webPath);
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
        setImageFile(blob);
      }
    } catch (err) {
      console.log('Camera error: ', err);
    }
  } else {
    fileInputRef.current?.click();
  }
};

export default handlePictureClick;
