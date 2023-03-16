import React, {useState} from 'react';
import {ScrollableScreen} from '../../layouts';
import {
  Container,
  Header,
  H3,
  P,
  H2,
  Spacing,
  A,
  Btn,
  Icon,
  Img,
} from '../../components';
import {Color, Icons} from '../../styles';
import {View, TextInput, Platform} from 'react-native';
import {CURRENT_LOCATION} from '../../helpers/constant';
import {launchImageLibrary} from 'react-native-image-picker';
import {displayToast, displayToastShort} from '../../helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Submission = ({route, navigation}) => {
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const options = {
    title: 'Pilih gambar',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const pickImg = async () => {
    try {
      let result = await launchImageLibrary(options);

      if (!result || result.didCancel) return;

      const image = {
        uri:
          Platform.OS === 'ios'
            ? result.assets[0].uri.replace('file://', '')
            : result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      };
      setImg(image);
    } catch (error) {
      displayToastShort('Kesalahan dalam mengakses galeri/kamera');
    }
  };

  const submitLocation = async () => {
    try {
      displayToastShort('Melakukan submisi ...');
      setTimeout(() => displayToastShort('Berhasil melakukan submisi!'), 1000);
    } catch (error) {}
  };

  return (
    <ScrollableScreen noGradient>
      <Container>
        <P>Daftarkan ruang terbuka hijau temuanmu!</P>
        <Spacing />
        <H3>Foto lokasi</H3>
        <TouchableOpacity onPress={pickImg}>
          <View
            style={{
              borderStyle: 'dashed',
              borderColor: Color.main,
              width: '100%',
              borderWidth: 2,
              borderRadius: 15,
              height: 200,
              backgroundColor: Color.text4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {img ? (
              <Img src={{uri: img.uri}} resizeMode={'cover'} />
            ) : (
              <Icon name={Icons.add} size={50} />
            )}
          </View>
        </TouchableOpacity>
        <Spacing />
        <H3>Lokasimu saat ini</H3>
        <View>
          <TextInput
            editable={false}
            style={{
              minHeight: 50,
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
            }}
            value={`${CURRENT_LOCATION.latitude}, ${CURRENT_LOCATION.longitude}`}
            placeholderTextColor={Color.text3}
          />
        </View>

        <Spacing />
        <H3>Deskripsi</H3>
        <View>
          <TextInput
            maxLength={60}
            value={description}
            autoCapitalize={true}
            multiline
            onChangeText={t => setDescription(t)}
            // onFocus={() => setBorder(Color.main)}
            // onBlur={() => setBorder(Color.theme.background)}
            style={{
              height: 100,
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
            placeholder={'Deskripisi singkat lokasi ...'}
            placeholderTextColor={Color.text3}
            keyboardType={'default'}
          />
        </View>
        <Spacing />
        <Btn title="Submisi" onPress={submitLocation} />
      </Container>
      <Spacing height={60} />
    </ScrollableScreen>
  );
};
