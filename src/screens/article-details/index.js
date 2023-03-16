import React from 'react';
import {ScrollableScreen} from '../../layouts';
import {H2, Container, P, H3, Spacing, Img, Icon} from '../../components';
import {Color, Icons} from '../../styles';
import {TouchableOpacity, View} from 'react-native';
import {RECOMMENDATION} from '../../helpers/constant';

export const ArticleDetails = ({route, navigation}) => {
  const {id, articleId} = route.params;
  const ARTICLE = RECOMMENDATION[id].articleList[articleId];
  return (
    <ScrollableScreen noGradient>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <H3 style={{color: Color.text}}>{ARTICLE.category}</H3>
            <H2>{ARTICLE.title}</H2>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color.text4,
              padding: 10,
              borderRadius: 10,
            }}>
            <Icon name={Icons.share} size={32} color={Color.text2} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 200,
            width: '100%',
            marginVertical: 10,
          }}>
          <Img
            src={ARTICLE.image.src}
            style={{height: '100%'}}
            resizeMode={'cover'}
          />
          <P>Sumber: Pixabay</P>
        </View>

        <Spacing />
        <P style={{lineHeight: 25, fontSize: 16, textAlign: 'left'}}>
          {ARTICLE.content}
        </P>
        <Spacing height={60} />
      </Container>
    </ScrollableScreen>
  );
};
