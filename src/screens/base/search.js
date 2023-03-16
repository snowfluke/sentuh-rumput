import React, {useContext, useEffect, useState} from 'react';
import {FixedScreen} from '../../layouts';
import {View, TouchableOpacity, TextInput, Linking} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import {Icon, Img, Loading, P, Container, H3} from '../../components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getDelta, isWithinRadius, retrieveLocal} from '../../helpers';
import {CURRENT_LOCATION, DB, RADIUS} from '../../helpers/constant';
import {Color, Icons} from '../../styles';
import storage from '@react-native-firebase/storage';
import {GlobalContext} from '../../context/global-context';
// import MapViewDirections from 'react-native-maps-directions';
// import {GOOGLE_MAPS_API_KEY} from '../../config';

export const Search = ({route, navigation}) => {
  const {settings} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [db, setDb] = useState([]);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState('');

  const usersSettings = settings.get();

  const fetchData = async () => {
    try {
      setLoading(true);

      const delta = getDelta(usersSettings.radius);
      const allLoc = await retrieveLocal('nearest');
      const pos = await retrieveLocal('position');

      setRegion({
        latitude: pos.latitude,
        longitude: pos.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
      setDb(allLoc);
      setPosition(pos);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToDetail = el => {
    navigation.navigate('Detail lokasi', el);
  };

  const goToSubmission = () => {
    navigation.navigate('Submisi lokasi');
  };

  const renderSearchResult = input => {
    let list = db.filter(el =>
      el.name.toLowerCase().includes(input.toLowerCase()),
    );

    const renderResult = n =>
      n.map((el, id) => (
        <View
          key={id}
          style={{
            marginVertical: 10,
            borderBottomColor: Color.text3,
            borderBottomWidth: 1,
          }}>
          <P>{el.name}</P>
        </View>
      ));
    return (
      <View
        style={{
          backgroundColor: Color.background,
          padding: 5,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          zIndex: 99,
        }}>
        <H3>Hasil pencarian</H3>

        {list.length == 0 ? (
          <View>
            <P>Tidak ditemukan lokasi "{input}"</P>
          </View>
        ) : (
          renderResult(list)
        )}
      </View>
    );
  };

  const renderAllMarker = list =>
    list.map((el, id) => (
      <Marker
        key={id}
        coordinate={{
          latitude: el.coordinates.latitude,
          longitude: el.coordinates.longitude,
        }}
        onPress={() => setDestination(el)}
        title={el.name}>
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
            backgroundColor: Color.background,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderColor: Color.accent600,
            borderWidth: 4,
          }}>
          <MarkerImage image={el.image} />
        </View>
      </Marker>
    ));

  const renderUserLocationMarker = () => {
    return (
      <Marker
        coordinate={{
          latitude: position.latitude,
          longitude: position.longitude,
        }}
        flat={true}
        anchor={{x: 0.5, y: 0.5}}
        // rotation
        title={'Posisi kamu'}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: Color.background,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderColor: Color.accent600,
            borderWidth: 3,
          }}>
          <Icon name={Icons.navigation} size={24} color={Color.accent600} />
        </View>
      </Marker>
    );
  };

  const renderSearch = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          right: 0,
          minHeight: 80,
          width: '100%',
          zIndex: 99,
        }}>
        <Container>
          <TextInput
            maxLength={60}
            value={input}
            autoCapitalize={true}
            onChangeText={t => setInput(t)}
            // onFocus={() => setBorder(Color.main)}
            // onBlur={() => setBorder(Color.theme.background)}
            style={{
              minHeight: 50,
              paddingVertical: 0,
              paddingHorizontal: 15,
              marginTop: 5,
              textAlignVertical: 'center',
              fontFamily: 'Poppins-Regular',
              backgroundColor: Color.background,
              borderRadius: 10,
              fontSize: 16,
              elevation: 1,
              flex: 1,
              color: Color.text,
              borderWidth: 2,
              borderColor: Color.text3,
            }}
            placeholder={'Cari ruang terbuka hijau ...'}
            placeholderTextColor={Color.text3}
            keyboardType={'default'}
          />

          {input.length !== 0 && renderSearchResult(input)}
        </Container>
      </View>
    );
  };

  const renderMap = () => {
    return (
      <View style={{flex: 1}}>
        <MapView
          onPress={() => setDestination(null)}
          provider={PROVIDER_GOOGLE}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          showsCompass={false}
          showsTraffic={false}
          showsIndoorLevelPicker={false}
          initialRegion={region}
          style={{flex: 1}}>
          {/* {routes && (
            <MapViewDirections
              origin={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
              destination={{
                latitude: routes.latitude,
                longitude: routes.longitude,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor={Color.accent600}
              optimizedWaypoints={true}
            />
          )} */}

          {db.length !== 0 && renderAllMarker(db)}
          {renderUserLocationMarker()}
        </MapView>
      </View>
    );
  };
  const RenderScreen = () => (
    <FixedScreen>
      <View style={{flex: 1, position: 'relative'}}>
        {renderSearch()}
        {renderMap()}

        <View
          style={{
            position: 'absolute',
            bottom: 150,
            borderRadius: 25,
            elevation: 1,
            right: 20,
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.accent600,
          }}>
          <TouchableOpacity onPress={goToSubmission}>
            <Icon name={Icons.add} color={Color.background} />
          </TouchableOpacity>
        </View>

        {destination && (
          <View
            style={{
              height: 70,
              width: '100%',
              position: 'absolute',
              bottom: 75,
              zIndex: 99,
            }}>
            <Container>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (destination.id == routes?.id) return setRoutes(null);

                    setRoutes({
                      id: destination.id,
                      latitude: destination.coordinates.latitude,
                      longitude: destination.coordinates.longitude,
                    });

                    Linking.openURL(
                      `https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates.latitude},${destination.coordinates.longitude}&dir_action=navigate&origin=${position.latitude},${position.longitude}`,
                    );
                  }}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 1,
                    backgroundColor:
                      routes?.id !== destination.id
                        ? Color.accent600
                        : Color.background,
                  }}>
                  <H3
                    style={{
                      color:
                        routes?.id !== destination.id
                          ? Color.background
                          : Color.accent600,
                    }}>
                    {!routes
                      ? 'Lihat rute'
                      : routes?.id !== destination.id
                      ? 'Lihat rute'
                      : 'Tutup rute'}
                  </H3>
                </TouchableOpacity>
                <View style={{width: 20}} />
                <TouchableOpacity
                  onPress={() => goToDetail(destination)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 1,
                    backgroundColor: Color.accent600,
                  }}>
                  <H3
                    style={{
                      color: Color.background,
                    }}>
                    Lihat detail
                  </H3>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        )}
      </View>
    </FixedScreen>
  );

  return <>{loading ? <Loading /> : RenderScreen()}</>;
};

function MarkerImage({image}) {
  const [photo, setPhoto] = useState(null);

  const fetchPhotos = async () => {
    try {
      const url = await storage().ref(image).getDownloadURL();
      setPhoto({uri: url});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      {photo ? (
        <Img src={photo} resizeMode={'cover'} />
      ) : (
        <View
          style={{
            fleX: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <H3
            style={{
              textAlign: 'center',
            }}>
            Memuat...
          </H3>
        </View>
      )}
    </>
  );
}
