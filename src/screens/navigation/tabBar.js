import React from 'react';
import {View, Platform} from 'react-native';
import {BottomMenuItem} from './bottomMenuItem';
import {style} from './style';

export const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      style={[
        style.tabContainer,
        {marginBottom: Platform.OS == 'ios' ? 20 : 0},
      ]}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View style={style.bottomMenuItemContainer} key={index}>
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
                title={route.name}
                onPress={onPress}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
