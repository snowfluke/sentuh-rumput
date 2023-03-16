import React from 'react';
import {style} from '../style';
import {P} from '../..';

const H1 = props => {
  return (
    <P variant="bold" style={{...style.heading1, ...props.style}}>
      {props.children}
    </P>
  );
};

export default H1;
