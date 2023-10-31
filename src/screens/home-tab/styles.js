import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  lan: {
    height: mvs(120),
    marginTop: mvs(20),
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: mvs(24),
  },
  heading: {
    fontSize: mvs(20),
    color: colors.primary,
  },
  normaltext: {
    fontSize: mvs(14),
    paddingVertical: mvs(4),
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(20),
    // paddingBottom: mvs(100),
    // margi
  },
  backgroundimg: {
    width: '100%',
    height: '100%',
  },
  notificationbadge: {
    backgroundColor: colors.bluecolor,
    // borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: mvs(-2),
    right: mvs(12),
    // padding: mvs(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(17),
    width: mvs(20),
    borderRadius: mvs(10),
  },
});
export default styles;
