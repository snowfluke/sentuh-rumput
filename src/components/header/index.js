import React, {useContext} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Img, H1} from '..';
import {GlobalContext} from '../../context/global-context';

import {style} from './style';

const Header = ({text, navigation}) => {
  const {user} = useContext(GlobalContext);
  const currentUser = user.get();

  const profileImage = currentUser?.photo
    ? {uri: currentUser.photo}
    : require('../../assets/misc/Profile.png');

  return (
    <View style={style.header}>
      <H1 style={style.headerText}>{text}</H1>
      <View style={{width: 10}} />

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Img src={profileImage} style={style.logoIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
