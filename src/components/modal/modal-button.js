import React, {useContext} from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {P} from '..';
import {GlobalContext} from '../../context/global-context';
import {Color, Effect} from '../../styles';
import {style} from './style';

export const ModalButton = ({buttonList}) => {
  const {modal} = useContext(GlobalContext);

  const renderButton = () =>
    buttonList.map((item, id) => (
      <TouchableNativeFeedback
        key={id}
        background={
          buttonList.length > 1 ? Effect.rippleWhiteMd : Effect.rippleWhite
        }
        style={style.radius}
        onPress={() => {
          if (item.dontClose) {
            item.onPress && item.onPress();
            return;
          }
          modal.closeModal();
          item.onPress && item.onPress();
        }}>
        <View style={style.button}>
          <P
            style={{
              ...style.buttonTitle,
              color: item.color ? item.color : Color.main,
            }}>
            {item.title}
          </P>
        </View>
      </TouchableNativeFeedback>
    ));

  return (
    <View style={style.buttonContainer}>
      {buttonList.length && renderButton()}
    </View>
  );
};
