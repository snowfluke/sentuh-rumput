import React from 'react';
import {View} from 'react-native';
import {ModalButton} from '../modal-button';
import {P} from '../..';
import {style} from '../style';

const TextModal = ({button = [{title: 'OK'}], text}) => {
  return (
    <View>
      <P style={style.textCenter}>{text}</P>
      <ModalButton buttonList={button} />
    </View>
  );
};
export default TextModal;
