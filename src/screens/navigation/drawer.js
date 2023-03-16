import React, {useContext, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, StyleSheet, Switch} from 'react-native';
import {Icon, H2, Img, H3, P} from '../../components';
import {Color, Icons} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GlobalContext} from '../../context/global-context';
import {displayToastShort, getYear, removeAtSymbol} from '../../helpers';

export const CustomDrawer = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {user} = useContext(GlobalContext);
  const currentUser = user.get();

  const toggleSwitch = () => {
    displayToastShort('Under development');
    setIsEnabled(previousState => !previousState);
  };
  const {state} = props;
  const activeRouteName = state.routeNames[state.index];

  const profileImage = currentUser?.photo
    ? {uri: currentUser.photo}
    : require('../../assets/misc/Profile.png');

  const signOut = () => {
    user.signOut();
    props.navigation.jumpTo('Masuk');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={style.drawerContent}>
          <View style={style.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Img src={profileImage} style={style.avatar} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <H2 style={style.title}>{currentUser?.name}</H2>
                <H3 variant={'light'} style={style.caption}>
                  {removeAtSymbol(currentUser?.email)}
                </H3>
              </View>
            </View>

            <View style={style.row}>
              <View style={style.section}>
                <H3 variant={'light'} style={style.caption}>
                  Bergabung sejak {getYear(currentUser?.dateJoined)}
                </H3>
              </View>
            </View>
          </View>

          <View style={style.drawerSection}>
            <DrawerItem
              pressColor={Color.main}
              activeTintColor={Color.main}
              inactiveTintColor={Color.text}
              activeBackgroundColor={Color.text4}
              icon={({color, size}) => (
                <Icon
                  name={Icons.home}
                  size={size}
                  color={
                    activeRouteName === 'DBeranda' ? Color.main : Color.text
                  }
                />
              )}
              label="Beranda"
              labelStyle={[
                style.drawerItem,
                {
                  color:
                    activeRouteName === 'DBeranda' ? Color.main : Color.text,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('DBeranda');
              }}
              style={
                activeRouteName === 'DBeranda'
                  ? {backgroundColor: Color.text4}
                  : {}
              }
            />
            <DrawerItem
              pressColor={Color.main}
              activeTintColor={Color.main}
              inactiveTintColor={Color.text}
              activeBackgroundColor={Color.text4}
              icon={({color, size}) => (
                <Icon
                  name={Icons.profile}
                  size={size}
                  color={activeRouteName === 'Profil' ? Color.main : Color.text}
                />
              )}
              label="Profil"
              labelStyle={[
                style.drawerItem,
                {
                  color: activeRouteName === 'Profil' ? Color.main : Color.text,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Profil');
              }}
              style={
                activeRouteName === 'Profil'
                  ? {backgroundColor: Color.text4}
                  : {}
              }
            />
            <DrawerItem
              pressColor={Color.main}
              activeTintColor={Color.main}
              inactiveTintColor={Color.text}
              activeBackgroundColor={Color.text4}
              icon={({color, size}) => (
                <Icon
                  name={Icons.favorite}
                  size={size}
                  color={
                    activeRouteName === 'Favorit' ? Color.main : Color.text
                  }
                />
              )}
              label="Favorit"
              labelStyle={[
                style.drawerItem,
                {
                  color:
                    activeRouteName === 'Favorit' ? Color.main : Color.text,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Favorit');
              }}
              style={
                activeRouteName === 'Favorit'
                  ? {backgroundColor: Color.text4}
                  : {}
              }
            />
            <DrawerItem
              pressColor={Color.main}
              activeTintColor={Color.main}
              inactiveTintColor={Color.text}
              activeBackgroundColor={Color.text4}
              icon={({color, size}) => (
                <Icon
                  name={Icons.settings}
                  size={size}
                  color={
                    activeRouteName === 'Pengaturan' ? Color.main : Color.text
                  }
                />
              )}
              label="Pengaturan"
              labelStyle={[
                style.drawerItem,
                {
                  color:
                    activeRouteName === 'Pengaturan' ? Color.main : Color.text,
                },
              ]}
              style={
                activeRouteName === 'Pengaturan'
                  ? {backgroundColor: Color.text4}
                  : {}
              }
              onPress={() => {
                props.navigation.navigate('Pengaturan');
              }}
            />
            <DrawerItem
              pressColor={Color.main}
              activeTintColor={Color.main}
              inactiveTintColor={Color.text}
              activeBackgroundColor={Color.text4}
              icon={({color, size}) => (
                <Icon
                  name={Icons.support}
                  size={size}
                  color={
                    activeRouteName === 'Dukungan' ? Color.main : Color.text
                  }
                />
              )}
              label="Dukungan"
              labelStyle={[
                style.drawerItem,
                {
                  color:
                    activeRouteName === 'Dukungan' ? Color.main : Color.text,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Dukungan');
              }}
              style={
                activeRouteName === 'Dukungan'
                  ? {backgroundColor: Color.text4}
                  : {}
              }
            />
          </View>

          <View style={style.drawerSection}>
            <View style={{paddingLeft: 20}}>
              <P style={{color: Color.text2}}>Preferensi</P>
              <TouchableOpacity onPress={toggleSwitch}>
                <View style={style.preference}>
                  <H3 style={{color: Color.text}}>Mode Gelap</H3>
                  <View pointerEvents="none">
                    <Switch
                      trackColor={{false: '#767577', true: Color.text3}}
                      thumbColor={isEnabled ? Color.accent600 : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  displayToastShort('Under development');
                }}>
                <View style={style.preference}>
                  <H3 style={{color: Color.text}}>Bahasa</H3>
                  <View pointerEvents="none">
                    <H3 variant={'regular'} style={{color: Color.text}}>
                      Indonesia
                    </H3>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={style.bottomDrawerSection}>
        <DrawerItem
          pressColor={Color.red}
          icon={({color, size}) => (
            <Icon name={Icons.logout} color={Color.red} size={size} />
          )}
          labelStyle={{...style.drawerItem, color: Color.red}}
          label="Keluar"
          onPress={signOut}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: Color.background,
    borderRadius: 25,
  },
  drawerItem: {
    fontFamily: 'Poppins-Bold',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: Color.text2,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
