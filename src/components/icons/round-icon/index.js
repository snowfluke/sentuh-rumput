import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Initial from '../initial';
import {Color} from '../../../styles';
import {style} from './style';

const RoundIcon = props => {
  const isExists = MaterialIcons.hasIcon(props.name);

  let size = props.size || 24;
  let wrapperSize = size * 1.8;
  return (
    <View style={{...style.roundIcon, width: wrapperSize, height: wrapperSize}}>
      {isExists ? (
        <MaterialIcons
          name={props.name}
          size={size}
          color={Color.background}
          {...props}
        />
      ) : (
        <Initial text={props.fallback || props.name} color={props.color} />
      )}
    </View>
  );
};

export default RoundIcon;
