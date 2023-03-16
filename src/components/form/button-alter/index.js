import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {style} from '../style';
import {P} from '../..';
import {Color} from '../../../styles';

const BtnAlter = props => {
  const Content = () => (
    <View
      style={{
        ...style.button,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 2,
        borderColor: Color.main,
      }}>
      <P style={{...style.buttonTitle, color: Color.main}}>{props.title}</P>
    </View>
  );
  return (
    <>
      {Platform.OS == 'android' ? (
        <TouchableNativeFeedback
          disabled={props.disabled || false}
          onPress={props.onPress}
          style={style.buttonOverlay}>
          {Content()}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity
          disabled={props.disabled || false}
          onPress={props.onPress}
          style={style.buttonOverlay}>
          {Content()}
        </TouchableOpacity>
      )}
    </>
  );
};

export default BtnAlter;
