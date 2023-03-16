import {StyleSheet} from 'react-native';
import {Color} from '../../styles';

export const style = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Color.main,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOverlay: {
    borderRadius: 10,
    width: '100%',
    height: 50,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.background,
  },
});
