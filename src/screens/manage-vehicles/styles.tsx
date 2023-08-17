import {StyleSheet} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flex: 1,
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(20),
    // paddingBottom: mvs(100),
  },
  contentContainerStyleFlatlist: {
    paddingVertical: mvs(10),
    flexGrow: 1,
    // paddingHorizontal: mvs(20),
    paddingBottom: mvs(100),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyleNew: {
    // marginVertical: mvs(10),
    marginBottom: mvs(40),
    paddingVertical: mvs(8),
    width: '100%',
    height: mvs(176),
    // borderColor: colors.primary,
    backgroundColor: colors.primary,
    // justifyContent: 'space-between',
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(30),
  },
  rendercontainer: {
    padding: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: mvs(10),
  },
  notificationicon: {
    width: mvs(35),
    height: mvs(35),
    resizeMode: 'contain',
  },
  titleandtextview: {
    flex: 1,
    paddingHorizontal: mvs(5),
  },
});
export default styles;
