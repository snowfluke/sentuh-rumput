import {StyleSheet} from 'react-native';
import {Color, Dimension} from '../../styles';

export const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Color.background,
    flexGrow: 1,
  },
  linearGradient: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    top: 0,
    height: Dimension.height / 2,
  },
});
