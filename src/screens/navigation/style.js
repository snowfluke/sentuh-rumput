import {StyleSheet} from 'react-native';
import {Color, Dimension} from '../../styles';

export const style = StyleSheet.create({
  tabContainer: {
    height: 70,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: Color.background,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: Dimension.width,
    alignSelf: 'center',
  },
  bottomMenuItemContainer: {
    flex: 1,
  },
  bottomMenuItem: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: 100,
    backgroundColor: Color.backgroundAccent,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  headerLeft: {
    marginRight: 10,
  },
  headerLogo: {
    width: 45,
    height: 45,
    color: Color.text2,
  },
  headerCenter: {
    flex: 1,
    color: Color.text2,
  },
  stackHeaderOptions: {
    headerBackTitleVisible: false,
    headerShown: true,
    headerStyle: {
      backgroundColor: Color.backgroundAccent,
    },
    headerTintColor: Color.text,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: 'Oxygen-Bold',
      fontSize: 16,
    },
  },
});
