import React, {useContext} from 'react';
import {ScrollableScreen} from '../../layouts';
import {Container, H3, Img} from '../../components';
import {TouchableOpacity, View} from 'react-native';
import {Color} from '../../styles';
import {IMAGES_CATEGORIES} from '../../helpers/constant';
import {GlobalContext} from '../../context/global-context';

export const Images = ({route, navigation}) => {
  const {images} = useContext(GlobalContext);
  return (
    <ScrollableScreen noGradient>
      <Container>
        {IMAGES_CATEGORIES.map((el, id) => (
          <ImagesCategoryCard
            key={id}
            title={el.name}
            img={el.image}
            state={images.get()}
            onPress={images.set}
            id={id}
          />
        ))}
      </Container>
    </ScrollableScreen>
  );
};

function ImagesCategoryCard({title, img, id, onPress, state}) {
  const selected = id == state;
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={{
        paddingVertical: 10,
        paddingLeft: selected ? 30 : 0,
        backgroundColor: selected ? Color.text4 : Color.background,
        borderBottomWidth: selected ? 5 : 1,
        borderBottomColor: selected ? Color.accent600 : Color.text3,
      }}>
      <H3>{title}</H3>
      <View
        style={{
          height: 60,
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <Img src={img} style={{height: '100%'}} />
      </View>
    </TouchableOpacity>
  );
}
