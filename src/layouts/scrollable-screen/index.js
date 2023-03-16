import React from 'react';
import {StatusBar, ScrollView, SafeAreaView} from 'react-native';
import {style} from './style';
import {Color} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';

const ScrollableScreen = props => {
  return (
    <>
      <StatusBar barStyle={Color.barStyle} backgroundColor={Color.main} />
      <SafeAreaView style={style.safeAreaView}>
        <ScrollView
          contentContainerStyle={style.contentContainer}
          keyboardShouldPersistTaps="handled"
          refreshControl={props.refreshControl}>
          {!props.noGradient && (
            <LinearGradient
              colors={[Color.main, Color.background]}
              style={style.linearGradient}
            />
          )}
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ScrollableScreen;
