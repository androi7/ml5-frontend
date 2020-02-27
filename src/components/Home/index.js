import React, { useState } from 'react';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqo5zfv4u';

const Home = props => {

  const [image, setImage] = useState('')

  const uploadImageToCloudinary = async e => {
    const images = e.target.files
    const formData = new FormData()
    formData.append('file', images[0])
    formData.append('upload_preset', 'react-preset')
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

  return (
    <div>
      <input type="file" name="file" onChange={uploadImageToCloudinary} />
      {/*<button onClick={selectImage}>Select</button>*/}
      <button>Upload</button>
      <img src={image} alt=""/>
    </div>
  );
}

export default Home;
