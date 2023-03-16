import React from 'react';
import {Color} from '../../../styles';
import {H2} from '../..';
import {StyleSheet, View} from 'react-native';

const Initial = ({text, color}) => {
  let initial = text ? text.toUpperCase().split(' ') : ['?'];
  let textIcon =
    initial.length > 1 ? initial[0][0] + initial[1][0] : initial[0][0];

  return (
    <View style={style.emptyBox}>
      <H2 style={{...style.mainColor, color}}>{textIcon}</H2>
    </View>
  );
};

export default Initial;

const style = StyleSheet.create({
  mainColor: {
    color: Color.main,
  },
  emptyBox: {
    width: 32,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
});
