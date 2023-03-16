import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Color} from '../../styles';
import {style} from './style';
import LinearGradient from 'react-native-linear-gradient';

const FixedScreen = props => {
  return (
    <>
      <StatusBar barStyle={Color.barStyle} backgroundColor={Color.main} />
      <SafeAreaView style={style.safeAreaView}>
        {!props.noGradient && (
          <LinearGradient
            colors={[Color.main, Color.background]}
            style={style.linearGradient}
          />
        )}
        {props.children}
      </SafeAreaView>
    </>
  );
};

export default FixedScreen;
