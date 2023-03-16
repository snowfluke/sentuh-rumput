import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Color, Effect} from '../../styles';
import {style} from './style';
import {P} from '../../components';

export const BottomMenuItem = ({iconName, isCurrent, title, onPress}) => {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={onPress}
        background={Effect.rippleWhiteSm}>
        <View style={style.bottomMenuItem}>
          <MaterialIcons
            name={iconName}
            size={30}
            style={{color: isCurrent ? Color.main : Color.text2}}
          />
          {isCurrent && (
            <P style={{color: isCurrent ? Color.main : Color.text2}}>{title}</P>
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
