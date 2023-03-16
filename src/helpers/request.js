import firestore from '@react-native-firebase/firestore';
import {calculateDistance, getBoundingBox} from '.';

export const reverseGeocode = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
  );
  const data = await res.json();
  return data;
};

export const getLocationWithinRadius = async (lat, lng, radius) => {
  const boundingBox = getBoundingBox(lat, lng, radius);
  const querySnapshots = await firestore().collection('locations').get();

  if (querySnapshots.size == 0) return [];
  let data = [];

  querySnapshots.forEach(el => {
    const snap = el.data();
    if (
      snap.coordinates.latitude > boundingBox.latMin &&
      snap.coordinates.latitude < boundingBox.latMax &&
      snap.coordinates.longitude > boundingBox.lonMin &&
      snap.coordinates.longitude < boundingBox.lonMax
    ) {
      data.push(snap);
    }
  });

  return data
    .map(el => {
      return {
        ...el,
        distance: calculateDistance(
          lat,
          lng,
          el.coordinates.latitude,
          el.coordinates.longitude,
        ),
      };
    })
    .sort((a, b) => a.distance - b.distance);
};
export const fetchReviews = async id => {
  const querySnapshots = await firestore()
    .collection('locations')
    .doc(id)
    .collection('reviews')
    .get();
  if (querySnapshots.size == 0) return [];
  let data = [];

  querySnapshots.forEach(el => {
    const snap = el.data();
    data.push(snap);
  });

  return data;
};
