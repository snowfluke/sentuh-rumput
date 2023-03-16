import React from 'react';
import {style} from '../style';
import {P} from '../..';

const H3 = props => {
  return (
    <P
      variant={props.variant || 'bold'}
      style={{...style.heading3, ...props.style}}>
      {props.children}
    </P>
  );
};

export default H3;
