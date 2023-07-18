import React from 'react';
import FastImage from 'react-native-fast-image';

import { mvs, width } from 'config/metrices';
import { StyleSheet, Image, View } from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { colors } from 'config/colors';
import Light from 'typography/light-text';
import { t } from 'i18next';
import { Row } from 'components/atoms/row';
import { eye, profile_pic } from 'assets/images';

const MeCard = ({ item }) => {
  return (
    <>
      <Row style={[styles.profileContainer, {
        paddingTop: item?.icon === eye ? mvs(91.12) : 0
      }]}>
        <Row>
          <Image source={item?.image} style={{
            height: item?.icon === eye ? mvs(61) : mvs(30),
            width: item?.icon === eye ? mvs(61) : mvs(30)
          }} />
          <View style={{ padding: mvs(10) }}>
            {item?.name && <Bold label={item?.name} fontSize={mvs(23.5)} color={'#000000'} />}
            <Regular label={item?.title} fontSize={mvs(15)} style={{ paddingLeft: item?.icon === eye ? 0 : mvs(6) }} />
          </View>
        </Row>
        <Image source={item?.icon} style={{
          height: item?.icon === eye ? mvs(20) : mvs(12),
          width: item?.icon === eye ? mvs(29) : mvs(6)
        }} />
      </Row>
    </>
  );
};

export default MeCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: mvs(30),
  },
  profileContainer: {
    paddingHorizontal: mvs(30),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
