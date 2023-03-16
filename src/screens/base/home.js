import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  TouchableNativeFeedback,
  BackHandler,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {Color, Dimension, Effect, Icons} from '../../styles';
import {
  Container,
  H2,
  H3,
  Header,
  Icon,
  Img,
  Loading,
  LoadingComponent,
  P,
  Spacing,
} from '../../components';
import {FixedScreen} from '../../layouts';
import {GlobalContext} from '../../context/global-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {CURRENT_LOCATION, DB, RADIUS} from '../../helpers/constant';
import storage from '@react-native-firebase/storage';
import {
  calculateDistance,
  displayToast,
  displayToastShort,
  getGoogleMapsLink,
  getRandomBoolean,
  hasLocationPermission,
  isOpen,
  isWithinRadius,
  storeLocal,
} from '../../helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getLocationWithinRadius, reverseGeocode} from '../../helpers/request';

export const Home = ({route, navigation}) => {
  const {user, settings} = useContext(GlobalContext);
  const currentUser = user.get();
  const [position, setPosition] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const radius = settings.get().radius;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'closest', title: 'Terdekat'},
    {key: 'history', title: 'Riwayat'},
  ]);

  const fetchData = async () => {
    try {
      const permissionCheck = await hasLocationPermission();
      if (!permissionCheck) {
        return BackHandler.exitApp();
      }

      Geolocation.getCurrentPosition(
        position => {
          if (position.mocked == true) {
            displayToastShort('GPS Palsu terdeteksi');
            return BackHandler.exitApp();
          }
          setPosition([position.coords.latitude, position.coords.longitude]);
          storeLocal('position', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          reverseGeocode(
            position.coords.latitude,
            position.coords.longitude,
          ).then(res =>
            setLocationName(
              `${res.address.village}, ${
                res.address?.city_district || res.address?.county
              }`,
            ),
          );
        },
        error => {
          displayToast('Terjadi kesalahan');
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 1500,
          fastestInterval: 1000,
          forceRequestLocation: true,
          showLocationDialog: true,
          useSignificantChanges: false,
        },
      );
      // setPosition([CURRENT_LOCATION.latitude, CURRENT_LOCATION.longitude]);
      // setLocationName('Kebayoran Baru, Jakarta Selatan');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchNearest = async () => {
    try {
      let locs = await getLocationWithinRadius(
        position[0],
        position[1],
        radius,
      );
      await storeLocal('nearest', locs);
      setData(locs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (position.length) {
      fetchNearest();
    }
  }, [position]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'closest':
        return (
          <ClosestTab
            navigation={navigation}
            data={data}
            radius={radius}
            position={position}
          />
        );
      case 'history':
        return <HistoryTab />;
      default:
        return null;
    }
  };

  const renderBanner = () => {
    let rd = data[Math.floor(Math.random() * data.length)];

    return (
      <Banner
        id={rd.id}
        onPress={() => navigation.navigate('Eksplorasi', {id: rd.id})}
        favorited={getRandomBoolean()}
        open={rd.alwaysOpen ? true : isOpen(rd.hours)}
        rating={rd.ratings}
        img={rd.image}
        name={rd.name}
        distance={rd.distance}
      />
    );
  };

  const renderScreen = () => (
    <FixedScreen>
      <Container>
        <Header
          text={`Sudahkah kamu hijau hari ini, ${currentUser?.givenName}?`}
          navigation={navigation}
        />
        <H3>Lokasi saat ini</H3>
        <View
          style={{
            backgroundColor: Color.background,
            marginBottom: 20,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (position.length == 0) return;
              let gmaps = getGoogleMapsLink(position[0], position[1]);
              Linking.openURL(gmaps);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={Icons.location} size={24} color={Color.accent600} />
              <H2 style={{color: Color.accent600, marginLeft: 10, flex: 1}}>
                {locationName ? locationName : 'Memindai...'}
              </H2>
            </View>
          </TouchableOpacity>
        </View>
        {data.length !== 0 && (
          <>
            <H3>Rekomendasi hari ini</H3>
            <View>{renderBanner()}</View>
            <Spacing />
          </>
        )}
        <H3>Ruang terbuka hijau</H3>
        {position.length !== 0 && (
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={props => (
              <TabBar
                {...props}
                activeColor={Color.black}
                inactiveColor={Color.text}
                indicatorStyle={{
                  width: '15%',
                  height: 2,
                  marginLeft: Dimension.width / 6,
                  alignSelf: 'center',
                  backgroundColor: Color.black,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
                renderLabel={({route, color}) => (
                  <H2 variant={'regular'} style={{color}}>
                    {route.title}
                  </H2>
                )}
                indicatorContainerStyle={{
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                style={{
                  backgroundColor: 'transparent',
                  shadowOpacity: 0,
                  elevation: 0,
                }}
              />
            )}
            onIndexChange={setIndex}
            initialLayout={{width: Dimension.width}}
            style={{flex: 1}}
          />
        )}
      </Container>
    </FixedScreen>
  );

  return <>{loading ? <Loading /> : renderScreen()}</>;
};

const ClosestTab = ({navigation, data, radius, position}) => {
  const renderList = list => {
    return list
      .filter(el =>
        isWithinRadius(
          position[0],
          position[1],
          el.coordinates.latitude,
          el.coordinates.longitude,
          radius,
        ),
      )
      .map((el, id) => (
        <LocationCard
          key={id}
          id={el.id}
          onPress={() => navigation.navigate('Eksplorasi', {id: el.id})}
          favorited={getRandomBoolean()}
          open={el.alwaysOpen ? true : isOpen(el.hours)}
          rating={el.ratings}
          img={el.image}
          name={el.name}
          distance={el.distance}
        />
      ));
  };
  return (
    <ScrollView style={style.scrollViewHome}>
      {data.length !== 0 && renderList(data)}
      {data.length === 0 && (
        <>
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
              Belum ditemukan ruang terbuka hijau dalam radius {radius} KM
            </H3>
          </View>
        </>
      )}

      <Spacing height={60} />
    </ScrollView>
  );
};

const LocationCard = ({
  id,
  onPress,
  favorited,
  rating,
  img,
  name,
  open,
  distance,
}) => {
  const [photo, setPhoto] = useState(null);

  const fetchPhotos = async () => {
    try {
      const url = await storage().ref(img).getDownloadURL();
      setPhoto({uri: url});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <View>
      <TouchableNativeFeedback
        onPress={onPress}
        background={Effect.rippleWhiteBorder}>
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
            borderRadius: 15,
            borderColor: Color.text3,
            marginTop: 20,
            padding: 10,
            backgroundColor: Color.background,
          }}>
          <View
            style={{
              backgroundColor: Color.text2,
              marginRight: 10,
              borderRadius: 10,
              width: 100,
              alignItems: 'center',
              height: 100,
              overflow: 'hidden',
              position: 'relative',
            }}>
            {favorited == true && (
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  borderRadius: 5,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  zIndex: 99,
                  backgroundColor: Color.background,
                }}>
                <Icon name={Icons.favorite} size={16} />
              </View>
            )}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={{
                position: 'absolute',
                zIndex: 99,
                bottom: 0,
                width: '100%',
                height: 25,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={Icons.star}
                  color={Color.warning}
                  size={18}
                  style={{marginHorizontal: 5}}
                />
                <P style={{color: Color.warning}} variant={'bold'}>
                  {' '}
                  {rating == 0 ? '-' : rating}
                </P>
              </View>
            </LinearGradient>

            {photo && (
              <Img
                src={photo}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            )}

            {!photo && (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  flex: 1,
                }}>
                <H3
                  style={{
                    color: Color.background,
                  }}>
                  Memuat...
                </H3>
              </View>
            )}
          </View>
          <View style={{flex: 1}}>
            <H3>{name}</H3>

            <View style={{flexDirection: 'row'}}>
              <Icon name={Icons.locationOn} color={Color.text} size={18} />
              <P style={{marginLeft: 5}}>
                {distance} KM • {open ? 'Jam Buka' : 'Jam Tutup'}
              </P>
            </View>
            <P style={{color: Color.accent600}} variant={'bold'}>
              Lihat di peta {'>'}
            </P>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const HistoryTab = () => {
  return (
    <ScrollView style={style.scrollViewHome}>
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
          Belum ditemukan riwayat ruang terbuka hijau yang telah dikunjungi
        </H3>
      </View>

      <Spacing height={60} />
    </ScrollView>
  );
};

const Banner = ({onPress, favorited, rating, img, name, open, distance}) => {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={onPress}
        background={Effect.rippleWhiteBorder}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 15,
            borderColor: Color.text3,
            padding: 10,
            backgroundColor: Color.background,
          }}>
          <View style={{}}>
            <H3>{name}</H3>
            <P style={{color: Color.accent600}} variant={'bold'}>
              Kunjungi {'>'}
            </P>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

// ** ---------------------------------------------
// ** HOME STYLE
// ** ---------------------------------------------

const style = StyleSheet.create({
  scrollViewHome: {
    flexGrow: 1,
  },
});
