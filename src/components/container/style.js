import {StyleSheet} from 'react-native';
import {Dimension} from '../../styles';

export const CONTAINER = (Dimension.width * 98) / 100;

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: CONTAINER,
    alignSelf: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  noFlexContainer: {
    padding: 15,
    width: CONTAINER,
    alignSelf: 'center',
  },
});
