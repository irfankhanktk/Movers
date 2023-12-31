import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flex: 1,
    paddingVertical: mvs(20),
    marginTop: '60%',

    // flexGrow: 1,
    // flex: 1,
    // paddingTop: '50%',
    // backgroundColor: 'blue',
    // paddingHorizontal: mvs(20),
  },
  txt: {marginBottom: mvs(10), fontSize: mvs(20)},
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  contentContainerStyleNew: {
    paddingHorizontal: mvs(20),
    // marginVertical: mvs(10),
    marginHorizontal: mvs(20),
    paddingVertical: mvs(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(6),
  },
  googlebutton: {
    backgroundColor: colors.white,
    marginHorizontal: mvs(10),
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(10),
    opacity: 0.8,
    alignSelf: 'center',
    borderRadius: mvs(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backgroundimg: {
    height: height,
    width: '100%',
    flex: 1,
    // position: 'absolute',
  },
  truckimageview: {
    alignSelf: 'center',
    position: 'absolute',
    top: mvs(140),
  },
  keyboardcontentcontainer: {
    paddingHorizontal: mvs(0),
    flexGrow: 1,
    // paddingBottom: mvs(250),
  },
  boldtext: {
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
  savebutton: {
    borderRadius: mvs(10),
    marginBottom: mvs(20),
  },
});
export default styles;
