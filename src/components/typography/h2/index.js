import React from 'react';
import {style} from '../style';
import {P} from '../..';

const H2 = props => {
  return (
    <P
      variant={props.variant || 'bold'}
      selectable={props.selectable}
      style={{...style.heading2, ...props.style}}>
      {props.children}
    </P>
  );
};

export default H2;
