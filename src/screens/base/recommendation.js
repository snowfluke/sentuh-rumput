import React from 'react';
import {ScrollableScreen} from '../../layouts';
import {TouchableOpacity, View} from 'react-native';
import {Container, H3, Header, Spacing, Icon, H2, P} from '../../components';
import {Color, Icons} from '../../styles';
import {CONTAINER} from '../../components/container/style';
import {RECOMMENDATION} from '../../helpers/constant';
import {displayToastShort} from '../../helpers';

export const Recommendation = ({route, navigation}) => {
  return (
    <ScrollableScreen>
      <Container>
        <Header
          text={'Hijaukan aktivitas dan pengetahuanmu!'}
          navigation={navigation}
        />

        <H3>Rekomendasi lokal</H3>

        {/* <View
          style={{
            backgroundColor: Color.background,
            borderRadius: 20,
            marginTop: 10,
            minHeight: 100,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={Icons.grass} size={40} />
          <H3
            variant={'light'}
            style={{color: Color.main, textAlign: 'center', marginTop: 5}}>
            Kamu belum berada di ruang terbuka hijau
          </H3>
        </View> */}
        <View
          style={{
            backgroundColor: Color.background,
            borderRadius: 20,
            marginTop: 10,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => displayToastShort('Under development')}>
            <H2 style={{color: Color.accent600}}>Taman Suropati</H2>
            <P variant={'bold'} style={{color: Color.accent600}}>
              Acara yang akan datang
            </P>
            <H3 variant={'light'} style={{color: Color.accent600}}>
              01/10/2018 - Penanaman pohon bersama {'>'}
            </H3>
            <H3 variant={'light'} style={{color: Color.accent600}}>
              01/12/2018 - Pameran bunga {'>'}
            </H3>

            <P variant={'bold'} style={{color: Color.accent600}}>
              Bacaan
            </P>
            <H3 variant={'light'} style={{color: Color.accent600}}>
              Sejarah terbentuknya taman ini {'>'}
            </H3>
          </TouchableOpacity>
        </View>

        <Spacing />
        <H3>Rekomendasi umum</H3>

        {RECOMMENDATION.map((el, id) => (
          <RecommendCard
            key={id}
            text={el.name}
            icon={el.icon}
            color={el.color}
            onPress={() =>
              navigation.navigate('Daftar rekomendasi', {
                id,
              })
            }
          />
        ))}
      </Container>
      <Spacing height={60} />
    </ScrollableScreen>
  );
};

function RecommendCard({icon, text, color = Color.main, onPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
        }}>
        <Icon name={icon} size={(19 / 100) * CONTAINER} color={color} />
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: Color.background,
          borderRadius: 10,
          width: '80%',
          minHeight: 50,
          borderWidth: 1,
          borderColor: color,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <H2 style={{color, textAlign: 'center'}}>{text}</H2>
      </TouchableOpacity>
    </View>
  );
}
