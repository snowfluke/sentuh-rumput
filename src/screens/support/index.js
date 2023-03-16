import React from 'react';
import {ScrollableScreen} from '../../layouts';
import {Container, Header, H3, P, H2, Spacing, A} from '../../components';
import {Color} from '../../styles';
import {View} from 'react-native';

export const Support = ({route, navigation}) => {
  return (
    <ScrollableScreen>
      <Container>
        <Header text={'Temukan pelarian hijaumu!'} navigation={navigation} />

        <H3>Tentang</H3>
        <View
          style={{
            backgroundColor: Color.background,
            marginBottom: 20,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <H2
            variant={'regular'}
            style={{color: Color.text, textAlign: 'left'}}>
            Sentuh Rumput merupakan sebuah solusi yang dikembangkan sebagai
            media masyarakat dalam menemukan ruang terbuka hijau untuk dapat
            dimanfaatkan sebagai ruang dalam meningkatkan kualitas kesehatan
            secara fisik dan mental.
          </H2>
        </View>
        <H3>Filosofi</H3>
        <View
          style={{
            backgroundColor: Color.background,
            marginBottom: 20,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <H2
            variant={'regular'}
            style={{color: Color.text, textAlign: 'left'}}>
            Slogan aplikasi “Temukan Pelarian Hijaumu” dibuat sedemikian rupa
            bersama nama aplikasi sebagai bentuk ajakan kepada penggunanya untuk
            menyegarkan diri ke ruang hijau terbuka dalam upaya peningkatan
            kualitas kesehatan.
          </H2>
        </View>
        <H3>Dukung</H3>
        <View
          style={{
            backgroundColor: Color.background,
            marginBottom: 20,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <H2
            variant={'regular'}
            style={{color: Color.text, textAlign: 'left'}}>
            Dukung kami dan bersama-sama menghijaukan dunia.
          </H2>
          <A
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=adminsentuhrumput@gmail.com&su=Sentuh Rumput - Bantuan&body=Halo, tim Sentuh Rumput!`}>
            adminsentuhrumput@gmail.com
          </A>
        </View>
      </Container>
    </ScrollableScreen>
  );
};
