import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    // paddingTop: '50%',
    // borderWidth: 1,
    // paddingBottom: mvs(200),
    paddingHorizontal: mvs(20),
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
    flexGrow: 1,
    paddingHorizontal: mvs(20),
    marginVertical: mvs(10),
    paddingVertical: mvs(20),
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
  logobackground: {
    height: mvs(400),
    width: width,
    position: 'absolute',
  },
  keyboardcontentcontainer: {
    paddingHorizontal: mvs(0),
    flexGrow: 0,
    paddingBottom: mvs(200),
  },
  boldtext: {
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
  IAgreeView: {
    flex: 1,
    paddingHorizontal: mvs(8),
    textAlign: 'center',
  },
  genderbuttoncontainer: {
    width: mvs(88),
    height: mvs(39),

    borderColor: colors.bluecolor,
    borderWidth: 1,
  },
});
export default styles;
