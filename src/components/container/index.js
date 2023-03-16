import React from 'react';
import {View} from 'react-native';
import {style} from './style';

export const Container = ({children}) => {
  return <View style={style.container}>{children}</View>;
};

export const CenteredContainer = props => {
  return (
    <View style={{...style.centeredContainer, ...props.style}}>
      {props.children}
    </View>
  );
};

export const NoFlexContainer = ({children}) => {
  return <View style={style.noFlexContainer}>{children}</View>;
};
