import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-simple-toast';
import {TextModal} from '../components';
import {PermissionsAndroid, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const truncate = (text, len) => {
  if (!text) return;
  return text.length < len ? text : text.substring(0, len) + ' ...';
};

export const nameCase = text =>
  text
    .toLowerCase()
    .split(' ')
    .map(el => el[0].toUpperCase() + el.substring(1))
    .join(' ');

export const formatMusicTime = sec => {
  if (!sec || sec == -1) return '0:00';
  const seconds = sec.toFixed(0);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
};

export const getBoundingBox = (latitude, longitude, radius) => {
  const R = 6371; // Earth's radius in km
  const latRadian = (latitude * Math.PI) / 180;
  const lonRadian = (longitude * Math.PI) / 180;
  const dLat = radius / R;
  const dLon = Math.asin(Math.sin(dLat) / Math.cos(latRadian));

  const latMin = latitude - (dLat * 180) / Math.PI;
  const latMax = latitude + (dLat * 180) / Math.PI;
  const lonMin = longitude - (dLon * 180) / Math.PI;
  const lonMax = longitude + (dLon * 180) / Math.PI;

  return {latMin, latMax, lonMin, lonMax};
};

export const storeEncrypted = async (key, data) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return false;
  }
};

export const addList = async (key, data) => {
  try {
    const prev = await retriveEncrypted(key);
    const newList = prev?.data || [];

    newList.push(data);
    await storeEncrypted(key, {data: newList});
  } catch (error) {
    console.log(error);
  }
};

export const storeLocal = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return false;
  }
};

export const retrieveLocal = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue == null) {
      return null;
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    return false;
  }
};

export const retriveEncrypted = async key => {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data !== undefined) return JSON.parse(data);
    return false;
  } catch (error) {
    return false;
  }
};

export const removeEncrypted = async key => {
  try {
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const displayText = (text, modal) =>
  modal.openModal(() => <TextModal text={text} />);

export const removeAtSymbol = text => (text ? text.split('@')[0] : '');
export const getYear = milis => (milis ? new Date(milis).getFullYear() : 0);
export const getFormatedDate = milis => {
  if (milis === 0) return '';
  const date = new Date(milis);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month}/${year} `;
};

export const isOpen = openingHours => {
  const now = new Date();
  const currentTime =
    now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
  return currentTime >= openingHours[0] && currentTime <= openingHours[1];
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
};

export const getDelta = radius => radius / 111.12;
export const calculateDistance = (starterLat, starterLon, destLat, destLon) => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = (starterLat * Math.PI) / 180;
  const lon1 = (starterLon * Math.PI) / 180;
  const lat2 = (destLat * Math.PI) / 180;
  const lon2 = (destLon * Math.PI) / 180;
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(1);
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) return true;
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    displayToast('Izinkan Sentuh Rumput mengakses lokasimu!');
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    displayToast('Sentuh Rumput tidak dapat berjalan tanpa akses lokasi');
  }

  return false;
};

export const getGoogleMapsLink = (latitude, longitude) => {
  const googleMapsBaseUrl = 'https://www.google.com/maps/search/?api=1&query=';
  const location = `${latitude},${longitude}`;
  return googleMapsBaseUrl + location;
};

export const isNear = (destination, origin) => {
  // treshold 0.02 KM
  const treshold = 0.02;
  const res = isWithinRadius(
    origin[0],
    origin[1],
    destination[0],
    destination[1],
    treshold,
  );

  return res;
};

export const isWithinRadius = (
  starterLat,
  starterLon,
  destLat,
  destLon,
  radius,
) => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = (starterLat * Math.PI) / 180;
  const lon1 = (starterLon * Math.PI) / 180;
  const lat2 = (destLat * Math.PI) / 180;
  const lon2 = (destLon * Math.PI) / 180;
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= radius;
};

export const displayToast = text => Toast.show(text, Toast.LONG);
export const displayToastShort = text => Toast.show(text, Toast.SHORT);
