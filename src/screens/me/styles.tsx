import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logout: {
    marginTop: mvs(58),
    marginHorizontal: mvs(166),
  },
});
export default styles;
