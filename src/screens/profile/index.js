import React, {useContext} from 'react';
import {ScrollableScreen} from '../../layouts';
import {
  Container,
  H2,
  Header,
  Img,
  Spacing,
  P,
  H1,
  H3,
  Icon,
} from '../../components';
import {Color, Icons} from '../../styles';
import {TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {GlobalContext} from '../../context/global-context';
import {getFormatedDate, getYear} from '../../helpers';

export const Profile = ({route, navigation}) => {
  const {user} = useContext(GlobalContext);
  const currentUser = user.get();

  const profileImage = currentUser?.photo
    ? {uri: currentUser.photo}
    : require('../../assets/misc/Profile.png');

  return (
    <ScrollableScreen>
      <Container>
        <Header
          text={'Lihat kemajuan hijau dalam dirimu!'}
          navigation={navigation}
        />
        <Img
          src={profileImage}
          style={{
            height: 100,
            width: 100,
            backgroundColor: Color.background,
            borderRadius: 50,
          }}
        />
        <Spacing />
        <H1 style={{textAlign: 'center'}}>{currentUser?.name}</H1>
        <P style={{textAlign: 'center'}}>{currentUser?.email}</P>
        <Spacing />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <H2>{currentUser?.totalVisit}</H2>
            <P>Kunjungan</P>
          </View>
          <View>
            <H2>{currentUser?.submission}</H2>
            <P>Submisi</P>
          </View>
          <View>
            <H2>{getYear(currentUser?.dateJoined)}</H2>
            <P>Bergabung</P>
          </View>
        </View>

        <Spacing />
        <H3>Kunjungan terakhir</H3>
        <P>
          {getFormatedDate(currentUser?.lastVisit?.date)}-{' '}
          {currentUser?.lastVisit?.place}
        </P>

        <Spacing />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <QRCode
            size={200}
            value={currentUser?.email}
            logo={require('../../assets/logo/mini-logo.png')}
          />
        </View>
        <View style={{flex: 0.5}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: Color.text4,
              borderRadius: 50,
            }}>
            <Icon name={Icons.info} color={Color.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: Color.text4,
              borderRadius: 50,
            }}>
            <Icon name={Icons.share} color={Color.text} />
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollableScreen>
  );
};
