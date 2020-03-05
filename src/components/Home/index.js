import React from 'react';

const Home = props => {

  const image = {
     backgroundImage: `url("https://res.cloudinary.com/dqo5zfv4u/image/upload/v1583418562/bokeh-modra_cwhcmi.jpg")`,
     height: 'calc(100vh - 64px)',
     backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat',
     backgroundSize: 'cover',
     filter: 'grayscale(70%)'
  };

  return (
    <div style={image}>
    </div>
  );
}

export default Home;
