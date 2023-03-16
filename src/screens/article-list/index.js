import React from 'react';
import {ScrollableScreen} from '../../layouts';
import {
  Btn,
  Container,
  H2,
  H3,
  RoundIcon,
  Img,
  P,
  Spacing,
} from '../../components';
import {View} from 'react-native';
import {Color} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RECOMMENDATION} from '../../helpers/constant';

export const ArticleList = ({route, navigation}) => {
  const {id} = route.params;
  const LIST = RECOMMENDATION[id];

  const renderList = l =>
    l.map((el, id2) => {
      return (
        <ActivityCard
          key={id2}
          number={id2 + 1}
          title={el.category}
          onPress={() => navigation.navigate('Detail', {id, articleId: id2})}
        />
      );
    });
  return (
    <ScrollableScreen noGradient>
      <Container>
        <Spacing />
        <View style={{height: 200}}>
          <Img src={LIST.img} style={{height: '100%'}} resizeMode={'contain'} />
        </View>
        <Spacing />

        <H3>{LIST.name}</H3>
        <Spacing />
        <View
          style={{
            backgroundColor: Color.text4,
            borderRadius: 15,
            padding: 10,
          }}>
          {LIST?.length !== 0 && renderList(LIST.articleList)}
        </View>
      </Container>
    </ScrollableScreen>
  );
};

function ActivityCard({title, number = '0', onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginVertical: 5,
      }}>
      <RoundIcon name={number.toString()} size={20} color={Color.background} />
      <H2 style={{color: Color.text, marginLeft: 10}}>{title}</H2>
    </TouchableOpacity>
  );
}
