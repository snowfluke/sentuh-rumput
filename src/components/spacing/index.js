import React from 'react';
import {View} from 'react-native';
import {style} from './style';

const Spacing = props => {
  let height = props.height || 20;
  return <View style={{...style.spacing, height}}></View>;
};

export default Spacing;
