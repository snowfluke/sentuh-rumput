import React from 'react';
import {View} from 'react-native';
import {Color} from '../../../styles';
import {ModalButton} from '../modal-button';
import {P} from '../..';

const LogoutModal = ({onPress}) => {
  return (
    <View>
      <P>Sayonara</P>
      <ModalButton
        buttonList={[{title: 'Keluar', color: Color.danger, onPress}]}
      />
    </View>
  );
};

export default LogoutModal;
