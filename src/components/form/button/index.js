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

const Btn = props => {
  const Content = () => (
    <View
      style={{
        ...style.button,
        backgroundColor: props.disabled ? Color.text3 : Color.main,
      }}>
      <P style={style.buttonTitle}>{props.title}</P>
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

export default Btn;
