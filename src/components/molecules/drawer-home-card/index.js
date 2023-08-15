import React from 'react';

import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Bold from 'typography/bold-text';

const DrawerHomeCard = ({
  icon1,
  icon2,
  label1,
  label2,
  br = 0,
  containerStyle,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        style={[
          styles.homeContainer,
          containerStyle,
          {
            borderRadius: mvs(br),
          },
        ]}>
        <Row>
          {icon1 && (
            <Image source={icon1} style={styles.img} resizeMode="contain" />
          )}
          <Bold label={label1} fontSize={mvs(15)} />
        </Row>
        {
          <Row style={{marginRight: mvs(22)}}>
            {label2 && (
              <>
                {icon2 && <Image source={icon2} style={styles.img} />}
                <Bold label={label2} fontSize={mvs(15)} />
              </>
            )}
          </Row>
        }
      </Row>
    </TouchableOpacity>
  );
};

export default DrawerHomeCard;
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
  img: {height: mvs(19), width: mvs(22), marginRight: mvs(16)},
  homeContainer: {
    backgroundColor: colors.white,
    height: mvs(48),
    width: width - 100,
    marginHorizontal: mvs(17),
    paddingHorizontal: mvs(17.5),
    alignItems: 'center',
    marginBottom: mvs(10),
  },
});
