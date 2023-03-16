import React, {useContext} from 'react';
import {ScrollView, View, Pressable, Modal} from 'react-native';
import {GlobalContext} from '../../context/global-context';
import {style} from './style';

const MyModal = () => {
  const {modal} = useContext(GlobalContext);
  const isVisible = modal.get().show;
  const ModalContent = modal.get().children;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={isVisible}
      onRequestClose={modal.closeModal}>
      <Pressable style={style.modalOuter} onPressOut={modal.closeModal}>
        <View style={style.modalInner}>
          <Pressable style={style.maxHeight}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={style.scrollView}>
              <ModalContent />
            </ScrollView>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default MyModal;
