import React from 'react';
import {style} from '../style';
import {P} from '../..';

const H4 = props => {
  return <P style={{...style.heading4, ...props.style}}>{props.children}</P>;
};

export default H4;
