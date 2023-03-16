import React from 'react';
import {style} from '../style';
import {P} from '../..';

const InputLabel = props => {
  return (
    <P style={{...style.heading4, ...props.style}} selectable={false}>
      {props.children}
    </P>
  );
};

export default InputLabel;
