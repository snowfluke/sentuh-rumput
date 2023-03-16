import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {Info} from '../..';

const A = ({href, children}) => {
  return (
    <TouchableOpacity
      style={{alignSelf: 'flex-start'}}
      onPress={() => Linking.openURL(href)}>
      <Info>{children}</Info>
    </TouchableOpacity>
  );
};

export default A;
