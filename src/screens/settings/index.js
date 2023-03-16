import React, {useContext, useState} from 'react';
import {ScrollableScreen} from '../../layouts';
import {Container, H2, H3, Header, P, Spacing} from '../../components';
import {Switch, TouchableOpacity, View} from 'react-native';
import {Color} from '../../styles';
import {GlobalContext} from '../../context/global-context';

export const Settings = ({route, navigation}) => {
  const {user, settings, modal} = useContext(GlobalContext);
  const userSettings = settings.get();

  const signOut = () => {
    user.signOut();
    navigation.jumpTo('Masuk');
  };

  return (
    <ScrollableScreen>
      <Container>
        <Header text={'Sesuaikan perangkat hijaumu!'} navigation={navigation} />
        <H3>Pengaturan</H3>
        <View
          style={{
            backgroundColor: Color.text4,
            borderRadius: 15,
            padding: 10,
          }}>
          <RegularCard
            id={'radius'}
            title={'Radius'}
            description={'Jarak jangkauan pencarian peta (KM)'}
            state={userSettings?.radius}
            settings={settings}
            modal={modal}
            options={[
              {key: '10', value: 10},
              {key: '20', value: 20},
              {key: '30', value: 30},
              {key: '40', value: 40},
              {key: '50', value: 50},
            ]}
          />
          <SliderCard
            title={'Peta panas'}
            description={'Tampilkan titik-titik panas pada peta'}
            state={userSettings?.hotMap}
            id={'hotMap'}
            settings={settings}
          />
          <SliderCard
            title={'Transportasi publik'}
            description={'Tampilkan kondisi transportasi publik'}
            state={userSettings?.publicTransport}
            id={'publicTransport'}
            settings={settings}
          />
          <SliderCard
            title={'Perkiraan cuaca'}
            description={'Lihat perkiraan cuaca pada destinasi'}
            state={userSettings?.weatherForecast}
            id={'weatherForecast'}
            settings={settings}
          />
        </View>
        <Spacing />
        <H3>Preferensi</H3>
        <View
          style={{
            backgroundColor: Color.text4,
            borderRadius: 15,
            padding: 10,
          }}>
          <SliderCard
            title={'Mode gelap'}
            description={'Ubah tema warna tampilan'}
            state={userSettings?.darkTheme}
            id={'darkTheme'}
            settings={settings}
          />
          <RegularCard
            title={'Bahasa'}
            description={'Ubah bahasa aplikasi'}
            state={userSettings?.language?.code}
            id={'language'}
            modal={modal}
            settings={settings}
            options={[
              {
                key: 'ID',
                value: {code: 'ID', display: 'Indonesia'},
                selected: true,
              },
              {
                key: 'EN',
                value: {code: 'EN', display: 'English'},
                selected: false,
              },
            ]}
          />
        </View>
        <Spacing />
        <View
          style={{
            backgroundColor: Color.red,
            borderRadius: 15,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={signOut} style={{flex: 1}}>
              <H2 style={{color: Color.background}}>Keluar Aplikasi</H2>
              <P style={{color: Color.background}}>Sentuh Rumput versi 1.0</P>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </ScrollableScreen>
  );
};

function RegularCard({
  title,
  description,
  id,
  settings,
  state,
  modal,
  options,
}) {
  const changeSettings = el => {
    settings.set({[id]: el.value});
    modal.closeModal();
  };

  const openModal = () => {
    modal.openModal(() => (
      <View
        style={{
          width: '100%',
          backgroundColor: Color.background,
          borderRadius: 10,
          padding: 10,
        }}>
        {options.map((el, id) => (
          <View
            key={id}
            style={{
              flex: 1,
              backgroundColor: el.key == state ? Color.main : Color.background,
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={() => changeSettings(el)}>
              <H3
                style={{
                  textAlign: 'center',
                  color: el.key == state ? Color.background : Color.text,
                }}>
                {el.key}
              </H3>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View
      style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <H2>{title}</H2>
        <P>{description}</P>
      </View>
      <TouchableOpacity
        onPress={openModal}
        style={{
          backgroundColor: Color.accent600,
          minWidth: 50,
          padding: 10,
          height: 50,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <H3 style={{color: Color.background}}>{state}</H3>
      </TouchableOpacity>
    </View>
  );
}

function SliderCard({title, description, state, id, settings}) {
  const [isActive, setIsActive] = useState(state);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    settings.set({[id]: !isActive});
  };

  return (
    <View style={{flexDirection: 'row', marginVertical: 5}}>
      <View style={{flex: 1}}>
        <H2>{title}</H2>
        <P>{description}</P>
      </View>
      <Switch
        trackColor={{false: '#767577', true: Color.text3}}
        thumbColor={isActive ? Color.accent600 : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isActive}
      />
    </View>
  );
}
