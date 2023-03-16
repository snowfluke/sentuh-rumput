import React from 'react';
import {Image} from 'react-native';
import {style} from './style';

const Img = props => {
  return (
    <Image
      source={props.src}
      style={{...style.img, ...props.style}}
      resizeMode={props.resizeMode || 'cover'}
    />
  );
};

export default Img;
