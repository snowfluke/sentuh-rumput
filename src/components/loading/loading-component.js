import React from 'react';
import {CenteredContainer} from '..';
import Lottie from 'lottie-react-native';

const LoadingComponent = () => {
  return (
    <CenteredContainer>
      <Lottie
        source={require('./130892-plantix-loader-logo-animation.json')}
        autoPlay
        loop
      />
    </CenteredContainer>
  );
};

export default LoadingComponent;
