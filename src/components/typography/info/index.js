import React from 'react';
import {P} from '../..';
import {style} from '../style';

const Info = props => {
  return <P style={style.info}>{props.children}</P>;
};

export default Info;
