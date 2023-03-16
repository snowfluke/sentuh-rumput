import {StyleSheet} from 'react-native';
import {Color} from '../../styles';

export const style = StyleSheet.create({
  modalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInner: {
    flex: 1,
    padding: 15,
    width: '95%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalWrapper: {
    paddingVertical: 20,
    minHeight: 100,
  },
  scrollView: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  maxHeight: {
    maxHeight: '70%',
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonTitle: {
    color: Color.main,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderTopColor: Color.text4,
    borderTopWidth: 2,
    flexDirection: 'row',
    marginTop: 10,
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  radius: {
    borderRadius: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
