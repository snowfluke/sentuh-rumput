// ** ---------------------------------------------
// ** ONBOARDING SCREEN
// ** ---------------------------------------------

import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {SentuhRumput} from '..';
import {FixedScreen} from '../../layouts';

import {Btn, H1, Spacing} from '../../components';
import {storeLocal} from '../../helpers';
import {Color, Dimension} from '../../styles';

const image = require('../../assets/illustrations/Banner.png');

export const Onboard = () => {
  const [onboardViewed, setOnboardViewed] = useState(false);

  const skipOnboard = async () => {
    try {
      await storeLocal('onboard', true);
      setOnboardViewed(true);
    } catch (err) {}
  };

  const renderOnboard = () => {
    if (!onboardViewed)
      return (
        <FixedScreen>
          <View style={style.container}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={style.image}>
              <View style={style.buttonContainer}>
                <H1 style={style.heroTitle}>
                  Cari dan temukan pelarian hijaumu!
                </H1>
                <Spacing height={50} />
                <Btn title="Mulai" onPress={skipOnboard} />
              </View>
            </ImageBackground>
          </View>
        </FixedScreen>
      );

    return <SentuhRumput />;
  };
  return renderOnboard();
};

// ** ---------------------------------------------
// ** ONBOARD STYLE
// ** ---------------------------------------------

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: (10 / 100) * Dimension.width,
    width: '100%',
    paddingHorizontal: (5 / 100) * Dimension.width,
  },
  heroTitle: {
    color: Color.background,
    fontSize: 38,
  },
});
