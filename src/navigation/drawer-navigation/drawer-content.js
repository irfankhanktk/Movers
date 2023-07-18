import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { colors } from 'config/colors';
import { mvs, width } from 'config/metrices';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Bold from 'typography/bold-text';

const CustomDrawerContent = (props) => {
  return (
    <View
      style={styles.drawerContainer}>
      <View style={styles.header}>

      </View>
      <Bold label={'Home'} />
    </View>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  header: { height: mvs(120), width: width - 60, backgroundColor: colors.green }
});
