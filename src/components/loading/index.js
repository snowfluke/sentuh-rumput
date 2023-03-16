import React from 'react';
import {FixedScreen} from '../../layouts';
import {CenteredContainer} from '..';
import Lottie from 'lottie-react-native';

const Loading = () => {
  return (
    <FixedScreen>
      <CenteredContainer>
        <Lottie
          source={require('./130892-plantix-loader-logo-animation.json')}
          autoPlay
          loop
        />
      </CenteredContainer>
    </FixedScreen>
  );
};

export default Loading;
