import React, { useState, useEffect } from 'react';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqo5zfv4u';

const Image = (props) => {

  const [image, setImage] = useState('');

  const uploadImageToCloudinary = async imgCnv => {
    // const images = e.target.files
    console.log('imgCnv', imgCnv);
    const formData = new FormData();
    formData.append('file', imgCnv); // images[0]
    formData.append('upload_preset', 'react-preset');
    const url = `${CLOUDINARY_URL}/image/upload`;
    await fetch(url,
     {
       method: 'POST',
       body: formData
     }
    )
      .then(res => res.json())
      .then(res => setImage(res.secure_url));
  }

  useEffect(() => {
    setImage(props.snapImage);
    if(props.snapImage) {
      console.log('to cloud:', props.snapImage);
      uploadImageToCloudinary(props.snapImage);
    }
  }, [props.snapImage]);

  return (
    <div>
      <img src={image} width="200" />
    </div>
  );
};

export default Image;
