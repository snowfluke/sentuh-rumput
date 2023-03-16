import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Initial from '../initial';
import {Color} from '../../../styles';

const Icon = props => {
  const isExists = MaterialIcons.hasIcon(props.name);
  return (
    <>
      {isExists ? (
        <MaterialIcons
          name={props.name}
          size={32}
          color={Color.main}
          {...props}
        />
      ) : (
        <Initial text={props.fallback || props.name} />
      )}
    </>
  );
};

export default Icon;
