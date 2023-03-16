import React from 'react';
import {ScrollableScreen} from '../../layouts';
import {
  Container,
  H3,
  P,
  Header,
  H2,
  Spacing,
  Img,
  Icon,
} from '../../components';
import {View} from 'react-native';
import {Color, Icons} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Favorite = ({route, navigation}) => {
  return (
    <ScrollableScreen>
      <Container>
        <Header
          text={'Jaga tempat hijau kesukaanmu!'}
          navigation={navigation}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <H2>Lokasi favorit</H2>
          <TouchableOpacity>
            <H3 style={{color: Color.accent600}}>Lihat semua</H3>
          </TouchableOpacity>
        </View>
        <Spacing />
        <View
          style={{
            flexDirection: 'row',
            minHeight: 150,
          }}>
          <View
            style={{
              width: '47%',
              borderRadius: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: Color.text3,
              backgroundColor: Color.background,
            }}>
            <View
              style={{
                width: '100%',
                height: 80,
                borderRadius: 10,
                overflow: 'hidden',
                marginBottom: 10,
              }}>
              <Img
                src={require('../../assets/misc/Taman1.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <H3 style={{color: Color.text}}>Taman Hutan Kota Kampung Sawah</H3>
          </View>

          <View style={{width: '6%'}} />
          <View
            style={{
              width: '47%',
              borderRadius: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: Color.text3,
              backgroundColor: Color.background,
            }}>
            <View
              style={{
                width: '100%',
                height: 80,
                borderRadius: 10,
                overflow: 'hidden',
                marginBottom: 10,
              }}>
              <Img
                src={require('../../assets/misc/Taman2.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <H3 style={{color: Color.text}}>
              Hutan Kota Kebon Pisang Penjaringan
            </H3>
          </View>
        </View>
        <Spacing />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <H2>Gambar favorit</H2>
          <TouchableOpacity>
            <H3 style={{color: Color.accent600}}>Lihat semua</H3>
          </TouchableOpacity>
        </View>
        <Spacing />
        <View
          style={{
            flexDirection: 'row',
            minHeight: 150,
          }}>
          <View
            style={{
              width: '47%',
              borderRadius: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: Color.text3,
              backgroundColor: Color.background,
            }}>
            <View
              style={{
                width: '100%',
                height: 80,
                borderRadius: 10,
                overflow: 'hidden',
                marginBottom: 10,
              }}>
              <Img
                src={require('../../assets/misc/Taman1.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <H3 style={{color: Color.text}}>Taman Hutan Kota Kampung Sawah</H3>
          </View>
        </View>
        <Spacing />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <H2>Audio favorit</H2>
          <TouchableOpacity>
            <H3 style={{color: Color.accent600}}>Lihat semua</H3>
          </TouchableOpacity>
        </View>
        <Spacing />
        <View
          style={{
            flex: 1,
            backgroundColor: Color.background,
            borderRadius: 20,
            marginTop: 20,
            minHeight: 100,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={Icons.grass} size={40} />
          <H3
            variant={'light'}
            style={{color: Color.main, textAlign: 'center', marginTop: 5}}>
            Belum terdapat audio favorit
          </H3>
        </View>
      </Container>
    </ScrollableScreen>
  );
};
