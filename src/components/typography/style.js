import {StyleSheet} from 'react-native';
import {Color} from '../../styles';

export const style = StyleSheet.create({
  regular: {
    fontFamily: 'Poppins-Regular',
    color: Color.text,
    fontSize: 14,
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    fontSize: 14,
  },
  italic: {
    fontFamily: 'Poppins-Italic',
    color: Color.black,
    fontSize: 14,
  },
  boldItalic: {
    fontFamily: 'Poppins-BoldItalic',
    color: Color.black,
    fontSize: 14,
  },
  heading1: {
    fontSize: 20,
    color: Color.black,
  },
  heading2: {
    fontSize: 18,
    color: Color.black,
  },
  heading3: {
    fontSize: 14,
    color: Color.black,
  },
  heading4: {
    fontSize: 12,
  },
  info: {
    color: Color.accent600,
  },
});
