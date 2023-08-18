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
  earningtoucbaleview: {
    width: '45%',
    height: mvs(162),
    ...colors.shadow,
    borderRadius: mvs(6),
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  earningimg: {
    width: mvs(50),
    height: mvs(50),
    alignSelf: 'center',
    marginTop: mvs(12),
  },
  currencyview: {
    backgroundColor: '#C21818',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: mvs(2),
    borderRadius: mvs(6),
  },
  compleetdorderview: {
    width: '45%',
    height: mvs(162),
    ...colors.shadow,
    borderRadius: mvs(6),
    backgroundColor: colors.bluecolor,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  completedorderimage: {
    width: mvs(50),
    height: mvs(50),
    alignSelf: 'center',
    marginTop: mvs(12),
  },
});
export default styles;
