import React, {useContext, useState, useEffect} from 'react';
import {ScrollableScreen} from '../../layouts';
import {
  Container,
  H2,
  Img,
  Spacing,
  P,
  H1,
  H3,
  Icon,
  Btn,
} from '../../components';
import {Color, Icons} from '../../styles';
import {TouchableOpacity, View} from 'react-native';
import {GlobalContext} from '../../context/global-context';
import storage from '@react-native-firebase/storage';
import {fetchReviews} from '../../helpers/request';
import {TextInput} from 'react-native-gesture-handler';
import {displayToastShort, isNear} from '../../helpers';
import {CURRENT_LOCATION} from '../../helpers/constant';

export const Location = ({route, navigation}) => {
  const {modal} = useContext(GlobalContext);
  const destination = route.params;
  const [photo, setPhoto] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [textReview, setTextReview] = useState('');
  const [stars, setStars] = useState(0);

  const fetchDetails = async () => {
    try {
      const url = await storage().ref(destination.image).getDownloadURL();
      setPhoto({uri: url});

      const reviews = await fetchReviews(destination?.id);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const submitReview = async () => {
    try {
      displayToastShort('Mengirimkan ulasan ...');
      setTimeout(() => displayToastShort('Berhasil mengirimkan ulasan!'), 1000);
    } catch (error) {}
  };

  return (
    <ScrollableScreen noGradient>
      <Container>
        <View
          style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{
              padding: 3,
              borderRadius: 5,
              backgroundColor: Color.text4,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Icon name={'collections'} size={20} color={Color.text2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 3,
              borderRadius: 5,
              backgroundColor: Color.text4,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Icon name={Icons.share} size={20} color={Color.text2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              modal.openModal(() => (
                <View
                  style={{
                    width: '100%',
                    backgroundColor: Color.background,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <H3>Sampaikan pelanggaran</H3>
                  <View
                    style={{
                      borderColor: Color.text3,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      height: 100,
                      marginBottom: 5,
                    }}>
                    <P style={{color: Color.text3}}>
                      Deskripsikan pelanggaran yang terjadi ...
                    </P>
                  </View>
                  <Btn title={'Sampaikan'} />
                </View>
              ));
            }}
            style={{
              padding: 3,
              borderRadius: 5,
              backgroundColor: Color.text4,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Icon name={'flag'} size={20} color={Color.text2} />
          </TouchableOpacity>
        </View>
        <Spacing />

        {photo ? (
          <Img
            src={photo}
            style={{
              height: 100,
              width: 100,
              backgroundColor: Color.background,
              borderRadius: 50,
            }}
          />
        ) : (
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: 100,
              backgroundColor: Color.background,
              borderRadius: 50,
            }}>
            <H3
              style={{
                textAlign: 'center',
              }}>
              Memuat...
            </H3>
          </View>
        )}
        <Spacing />
        <H1 style={{textAlign: 'center'}}>{destination?.name}</H1>
        <P style={{textAlign: 'center'}}>Ditambahkan oleh: Tim Juara</P>
        <Spacing />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomColor: Color.text3,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={Icons.star} />
            <View style={{marginLeft: 10}}>
              <H2>{destination?.ratings || '-'}</H2>
              <P>Rating</P>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={'edit'} />
            <View style={{marginLeft: 10}}>
              <H2>{reviews?.length || '-'}</H2>
              <P>Ulasan</P>
            </View>
          </View>
        </View>

        <Spacing />
        <H3>Tambahkan ulasan</H3>

        {isNear(
          [destination.coordinates.latitude, destination.coordinates.longitude],
          [CURRENT_LOCATION.latitude, CURRENT_LOCATION.longitude],
        ) ? (
          <>
            <View
              style={{
                justifyContent: 'space-around',
                alignContent: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => setStars(1)}>
                <Icon
                  name={stars >= 1 ? Icons.star : Icons.starOutline}
                  color={Color.warning}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStars(2)}>
                <Icon
                  name={stars >= 2 ? Icons.star : Icons.starOutline}
                  color={Color.warning}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStars(3)}>
                <Icon
                  name={stars >= 3 ? Icons.star : Icons.starOutline}
                  color={Color.warning}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStars(4)}>
                <Icon
                  name={stars >= 4 ? Icons.star : Icons.starOutline}
                  color={Color.warning}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStars(5)}>
                <Icon
                  name={stars >= 5 ? Icons.star : Icons.starOutline}
                  color={Color.warning}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                maxLength={60}
                value={textReview}
                autoCapitalize={true}
                multiline
                onChangeText={t => setTextReview(t)}
                style={{
                  minHeight: 70,
                  paddingVertical: 0,
                  paddingHorizontal: 15,
                  marginTop: 5,
                  textAlignVertical: 'center',
                  fontFamily: 'Poppins-Regular',
                  backgroundColor: Color.text4,
                  borderRadius: 10,
                  fontSize: 16,
                  flex: 1,
                  color: Color.text,
                  borderWidth: 2,
                  borderColor: Color.text3,
                }}
                placeholder={'Ulasan kamu...'}
                placeholderTextColor={Color.text3}
                keyboardType={'default'}
              />
            </View>
            <Spacing />
            <Btn title="Ulas" onPress={submitReview} />
          </>
        ) : (
          <P style={{textAlign: 'center'}}>
            Kamu saat ini tidak sedang berada di lokasi (radius minimal 20
            meter)
          </P>
        )}

        <Spacing />
        <H3>Ulasan-ulasan</H3>

        {reviews?.length !== 0 ? (
          reviews?.map((el, id) => (
            <View
              key={id}
              style={{
                padding: 5,
                borderRadius: 5,
                borderBottomColor: Color.text3,
                borderBottomWidth: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name={Icons.star} color={Color.warning} size={18} />
                <P
                  variant={'bold'}
                  style={{color: Color.warning, marginLeft: 2}}>
                  {el.rating}
                </P>
                <P variant={'italic'} style={{marginLeft: 5}}>
                  " {el.review} "
                </P>
              </View>
              <P style={{textAlign: 'right'}}>{el.email}</P>
            </View>
          ))
        ) : (
          <P style={{textAlign: 'center'}}>Belum terdapat ulasan</P>
        )}
      </Container>
      <Spacing height={60} />
    </ScrollableScreen>
  );
};
