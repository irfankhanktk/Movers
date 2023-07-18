import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplashIcon} from 'assets/icons';
import {
  eye,
  profile,
  left,
  profile_pic,
  orders_plus,
  orders,
  inbox,
  setting,
} from 'assets/images';
import React from 'react';
import {ImageBackground, Image, View, Alert} from 'react-native';
import i18n from 'translation';
import {STORAGEKEYS} from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import {UTILS} from 'utils';
import {useAppDispatch} from 'hooks/use-store';
import styles from './styles';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {Row} from 'components/atoms/row';
import {mvs, width} from 'config/metrices';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import Line from 'components/atoms/line';
import MeCard from 'components/molecules/me-card';
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
