import React from 'react';

const logo = require('../../shared/assets/img/logo-50x120-white.png')

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={logo}
      {...props}
    />
  );
};

export default Logo;
