import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  eye,
  inbox,
  left,
  orders,
  orders_plus,
  profile,
  profile_pic,
  setting,
} from 'assets/images';
import Line from 'components/atoms/line';
import MeCard from 'components/molecules/me-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { Alert, View } from 'react-native';
import Bold from 'typography/bold-text';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Me = (props: props) => {
  const data = [
    {image: profile_pic, name: 'John Doe', title: 'Edit Profile', icon: eye},
    {image: profile, title: 'Profile', icon: left},
    {image: inbox, title: 'Inbox', icon: left},
    {image: orders_plus, title: 'Orders', icon: left},
    {image: orders, title: 'Orders', icon: left},
    {image: setting, title: 'Setting', icon: left},
  ];
  const {navigation} = props;
  return (
    <View style={{...styles.container}}>
      {data.map((item, index) => (
        <>
          <MeCard item={item} key={index} />
          <Line marginVertica={item?.icon === eye ? 25 : 13} />
        </>
      ))}
      <Bold
        label={'Log Out'}
        color={colors.primary}
        fontSize={mvs(15)}
        onPress={() => {
          Alert.alert('text pressed');
        }}
        style={styles.logout}
      />
    </View>
  );
};
export default Me;
