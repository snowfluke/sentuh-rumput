import React from 'react';
import {TextModal} from '../..';
import {Color} from '../../../styles';

const ConfirmModal = ({next, text}) => {
  return (
    <TextModal
      text={text}
      button={[
        {title: 'Tidak', color: Color.danger},
        {title: 'Ya', onPress: next},
      ]}
    />
  );
};

export default ConfirmModal;
