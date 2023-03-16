import {StyleSheet} from 'react-native';
import {Color} from '../../styles';

export const style = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: Color.black,
    fontSize: 24,
    flex: 1,
  },
  logoIcon: {
    height: 50,
    width: 50,
    backgroundColor: Color.background,
    borderRadius: 25,
  },
});
