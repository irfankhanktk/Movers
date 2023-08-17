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
});
export default styles;
