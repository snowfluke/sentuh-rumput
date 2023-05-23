import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {GlobalContext} from '../../context/global-context';
import {Color} from '../../styles';
import {ScrollableScreen} from '../../layouts';
import {
  Btn,
  CenteredContainer,
  Container,
  P,
  Img,
  Spacing,
  Loading,
  A,
} from '../../components';
import {
  displayToast,
  hasLocationPermission,
  retrieveLocal,
} from '../../helpers';

const image = require('../../assets/illustrations/undraw_Jogging_re_k28i.png');

export const Login = ({navigation, route}) => {
  const {user, settings} = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await user.signIn();
      navigation.jumpTo('DBeranda');
    } catch (err) {
      console.log(err);
      displayToast('Terjadi kesalahan, coba kembali');
    } finally {
      setLoading(false);
    }
  };

  const checkLogin = async () => {
    try {
      const permissionCheck = await hasLocationPermission();
      if (!permissionCheck) {
        return BackHandler.exitApp();
      }

      const localSettings = await retrieveLocal('settings');
      if (!localSettings) {
        const defaultSettings = {
          radius: 10,
          hotMap: true,
          publicTransport: true,
          weatherForecast: false,
          darkTheme: false,
          language: {
            code: 'ID',
            display: 'Indonesia',
          },
        };
        settings.set(defaultSettings);
      } else {
        settings.set(localSettings);
      }

      const loggedIn = await user.isSignIn();
      if (loggedIn) navigation.jumpTo('DBeranda');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const RenderScreen = () => (
    <ScrollableScreen>
      <Container>
        <CenteredContainer>
          <View style={style.imgContainer}>
            <Img src={image} style={style.img} />
          </View>
          <Spacing />
          <P style={{alignSelf: 'flex-start'}}>
            Hanya dengan satu sentuhan, kamu dapat langsung menikmati segala
            fitur yang tersedia di Sentuh Rumput.
          </P>
          <A
            href={
              'https://github.com/snowfluke/dummy/blob/main/sentuh-rumput-tos.md'
            }>
            Syarat dan ketentuan
          </A>
          <Spacing height={40} />
          <Btn title="Masuk dengan Google" onPress={handleSubmit} />
        </CenteredContainer>
      </Container>
    </ScrollableScreen>
  );

  return <>{loading ? <Loading /> : RenderScreen()}</>;
};

// ** ---------------------------------------------
// ** LOGIN STYLE
// ** ---------------------------------------------

const style = StyleSheet.create({
  imgContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Color.background,
  },
  img: {
    width: '100%',
  },
  altText: {
    color: Color.text,
    textAlign: 'right',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
  },
  registerContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
