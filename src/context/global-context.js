// context
import {Fragment} from 'react';
import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  retriveEncrypted,
  storeEncrypted,
  removeEncrypted,
  storeLocal,
} from '../helpers';

export const GlobalContext = createContext({
  user: null,
  modal: null,
  music: null,
  images: null,
  settings: null,
});

export const useGlobalContext = () => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    children: Fragment,
  });

  const [music, setMusic] = useState(0);
  const [images, setImages] = useState(0);
  const [settings, setSettings] = useState({
    radius: 10,
    hotMap: false,
    publicTransport: false,
    weatherForecast: false,
    darkTheme: false,
    language: {
      code: 'ID',
      display: 'Indonesia',
    },
  });

  const openModal = children =>
    setModal({
      show: true,
      children,
    });

  const closeModal = () =>
    setModal({
      show: false,
      children: Fragment,
    });

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const signed = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(signed.idToken);
    auth().signInWithCredential(googleCredential);

    const user = await firestore()
      .collection('users')
      .doc(signed.user.id)
      .get();
    if (!user.exists) {
      const data = {
        review: 0,
        submission: 0,
        validReport: 0,
        dateJoined: Date.now(),
        totalVisit: 0,
        lastVisit: {
          date: 0,
          place: '',
        },
        ...signed.user,
      };

      await firestore().collection('users').doc(signed.user.id).set(data);
      setUser(data);
      await storeEncrypted('user', data);
      return;
    }
    const data = user.data();
    setUser(data);
    await storeEncrypted('user', data);
  };

  const isSignIn = async () => {
    const exists = await retriveEncrypted('user');
    if (!exists || !exists?.idToken) return false;

    setUser(exists);
    return true;
  };

  const signOut = async () => {
    if (!user) return;

    await GoogleSignin.signOut();
    await removeEncrypted('user');
    setUser(null);
  };

  return {
    user: {
      get: () => user,
      set: user => setUser(user),
      signIn,
      isSignIn,
      signOut,
    },
    modal: {
      get: () => modal,
      openModal,
      closeModal,
    },
    music: {
      get: () => music,
      set: id => setMusic(id),
    },
    images: {
      get: () => images,
      set: id => setImages(id),
    },
    settings: {
      get: () => settings,
      set: newSettings => {
        const mixSettings = {...settings, ...newSettings};
        setSettings(mixSettings);
        storeLocal('settings', mixSettings);
      },
    },
  };
};
